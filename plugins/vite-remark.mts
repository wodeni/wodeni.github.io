// plugins/vite-plugin-remark-wikilinks.mjs
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkWikiLink from "remark-wiki-link";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeInferTitleMeta from "rehype-infer-title-meta";
import { visit } from "unist-util-visit";
import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import fastGlob from "fast-glob";

// Utility: Check if URL is external (http or //)
function isUrl(url) {
  return /^https?:\/\//.test(url) || url.startsWith("//");
}

function normalizePath(str: string): string {
  return str.replace(/\ /g, "-").toLowerCase();
}

export default function vitePluginRemarkMarkdown(
  options: { imageDir?: string; publicDir?: string; mdGlob?: string } = {}
) {
  const {
    imageDir = "images",
    publicDir = "public",
    mdGlob = "**/*.md", // you can customize the glob
  } = options;

  // The absolute folder where we copy images
  const absPublicImages = path.resolve(process.cwd(), publicDir, imageDir);

  // This will hold all known .md “slugs” (so remarkWikiLink doesn’t mark them as new)
  let knownPages = [];

  return {
    name: "vite-plugin-remark-markdown",

    // 1) In buildStart (or configResolved), gather all .md files
    async buildStart() {
      // Use fastGlob to find all .md files
      const allMdPaths = await fastGlob(mdGlob, {
        cwd: process.cwd(), // or a subfolder if you want
        absolute: false, // we just need relative
      });

      // Convert something like "docs/intro.md" -> "docs/intro"
      knownPages = allMdPaths.map((file) => {
        const base = path.basename(file, ".md");
        return normalizePath(base);
      });
    },

    async transform(code, id) {
      // Only run on .md files
      if (!id.endsWith(".md")) return null;

      // Create the output folder for images if needed
      await fs.mkdir(absPublicImages, { recursive: true }).catch(() => {});

      const mdDir = path.dirname(id);

      // 2) Build the unified pipeline
      const processor = unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkParseFrontmatter)

        // Tell remarkWikiLink about your known pages
        .use(remarkWikiLink, {
          // If a user writes [[SomePage]], check if 'SomePage' is in knownPages
          // If it is, remark-wiki-link won't mark it as new.
          permalinks: knownPages,

          // For the .md -> .html rewriting
          pageResolver: (name) => {
            // returns an array of possible matches
            // e.g. if user wrote [[docs/intro]], we might have 'docs/intro' in knownPages
            const normalizedName = normalizePath(name);
            return [normalizedName];
          },
          // If the final link is "docs/intro", produce "docs/intro.html" in the href
          hrefTemplate: (permalink) => `${permalink}`,
        })
        .use(remarkGfm)

        // Rewrites .md links -> .html
        .use(() => (tree) => {
          visit(tree, "link", (node) => {
            const u = node.url;
            if (!isUrl(u) && u.endsWith(".md")) {
              node.url = normalizePath(u).replace(/\.md$/, ".html");
            }
          });
        })

        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSlug)
        // Copy local images -> public/images
        .use(() => async (tree) => {
          const promises = [];
          visit(tree, ["image", "element"], (node) => {
            const isImg =
              (node.type === "element" && node.tagName === "img") ||
              node.type === "image";

            if (!isImg) return;

            const src = node.properties?.src || node.url;
            if (src && !isUrl(src)) {
              const decodedUrl = decodeURI(src);
              const publicPathRel = path.join(imageDir, decodedUrl);
              const absPublicPath = path.join(absPublicImages, decodedUrl);
              const originalFile = path.join(
                mdDir.replace(/^file:\/\//, ""),
                decodedUrl
              );

              promises.push(
                fs
                  .mkdir(path.dirname(absPublicPath), { recursive: true })
                  .then(() => fs.copyFile(originalFile, absPublicPath))
                  .catch((err) => {
                    console.error(
                      chalk.red(
                        `[vite-plugin-remark-markdown] Error copying image from ${originalFile} to ${absPublicPath}: ${err.message}`
                      )
                    );
                  })
              );
              // Rewrite <img src> to a path from the final HTML
              if (node.properties) {
                node.properties.src = `/${publicPathRel}`;
              } else {
                node.url = `/${publicPathRel}`;
              }
            }
          });
          await Promise.all(promises);
        })
        .use(rehypeAutolinkHeadings, { behavior: "append" })
        .use(rehypeInferTitleMeta)
        .use(rehypeStringify, { allowDangerousHtml: true });

      // 3) Process the content
      const file = await processor.process(code);
      const frontmatter = file.data.frontmatter || {};
      const html = String(file.value);

      // Return a JSON object with frontmatter + html
      const output = {
        frontmatter,
        html,
      };

      // Export as ESM
      return {
        code: `export default ${JSON.stringify(output)}`,
        map: null,
      };
    },
  };
}
