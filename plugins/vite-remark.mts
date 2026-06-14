// plugins/vite-plugin-remark-wikilinks.mjs
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkWikiLink from "@flowershow/remark-wiki-link";
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

function pathToNoteSlug(filePath: string): string {
  return normalizePath(
    filePath
      .replace(/^pool-notes\/public\//, "")
      .replace(/\.md$/, "")
      .replace(/\//g, "-")
  );
}

function splitUrlHash(url: string): [string, string] {
  const hashIndex = url.indexOf("#");
  if (hashIndex === -1) return [url, ""];
  return [url.slice(0, hashIndex), url.slice(hashIndex)];
}

export default function vitePluginRemarkMarkdown(
  options: { imageDir?: string; publicDir?: string; mdGlob?: string } = {}
) {
  const {
    imageDir = "images",
    publicDir = "public",
    mdGlob = "**/*.md", // you can customize the glob
  } = options;
  let baseUrl = "/"; // fallback

  // The absolute folder where we copy images
  const absPublicImages = path.resolve(process.cwd(), publicDir, imageDir);

  // This will hold all known public .md pages (so private wikilinks stay unresolved).
  let knownPages: Record<string, string> = {};
  let knownPageAliases: Record<string, string> = {};

  return {
    name: "vite-plugin-remark-markdown",
    configResolved(config) {
      // At this stage, you have the final resolved Vite config
      baseUrl = config.base;
    },

    // 1) In buildStart (or configResolved), gather all .md files
    async buildStart() {
      // Use fastGlob to find all .md files
      const allMdPaths = await fastGlob(mdGlob, {
        cwd: process.cwd(), // or a subfolder if you want
        absolute: false, // we just need relative
      });

      // Convert something like "docs/intro.md" -> "docs/intro"
      allMdPaths.forEach((file) => {
        const url = `/pool/notes/${pathToNoteSlug(file)}`;
        const aliases = [
          file,
          normalizePath(file),
          path.basename(file),
          normalizePath(path.basename(file)),
        ];

        knownPages[file] = url;
        aliases.forEach((alias) => {
          knownPageAliases[alias] = url;
        });
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
          files: Object.keys(knownPages),
          format: "shortestPossible",

          // For the .md -> .html rewriting
          urlResolver: ({ filePath }: { filePath: string }) => {
            // returns an array of possible matches
            // e.g. if user wrote [[docs/intro]], we might have 'docs/intro' in knownPages
            if (knownPages[filePath]) {
              return knownPages[filePath];
            } else {
              return filePath; // fallback to original
            }
          },
        })
        .use(remarkGfm)

        // Private Obsidian links are not in the public note graph. Keep the
        // internal-link styling, but remove the destination so they do not
        // navigate anywhere.
        .use(() => (tree) => {
          visit(tree, "wikiLink", (node) => {
            if (node.data?.existing === false) {
              delete node.data.hProperties?.href;
            }
          });
        })

        // Rewrites Markdown note links to the React note route.
        .use(() => (tree) => {
          visit(tree, "link", (node) => {
            const u = node.url;
            const [urlPath, hash] = splitUrlHash(u);
            if (!isUrl(u) && urlPath.endsWith(".md")) {
              const decodedUrlPath = decodeURI(urlPath);
              const currentPublicDir = path.dirname(
                path.relative(process.cwd(), mdDir.replace(/^file:\/\//, ""))
              );
              const targetPath = path.normalize(
                path.join(currentPublicDir, decodedUrlPath)
              );
              const publicNoteUrl =
                knownPageAliases[targetPath] ??
                knownPageAliases[normalizePath(targetPath)] ??
                knownPageAliases[decodedUrlPath] ??
                knownPageAliases[normalizePath(decodedUrlPath)] ??
                knownPageAliases[path.basename(decodedUrlPath)] ??
                knownPageAliases[normalizePath(path.basename(decodedUrlPath))];

              if (publicNoteUrl !== undefined) {
                node.url = `${publicNoteUrl}${hash}`;
              } else {
                node.url = "";
                node.data = {
                  hName: "a",
                  hProperties: {
                    className: ["internal", "new"],
                  },
                  hChildren: node.children,
                };
              }
            }
          });
        })

        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(() => (tree) => {
          visit(tree, "element", (node) => {
            if (node.tagName !== "a") return;

            const className = node.properties?.className;
            const classes = Array.isArray(className)
              ? className
              : typeof className === "string"
              ? className.split(/\s+/)
              : [];

            if (
              classes.includes("internal") &&
              classes.includes("new") &&
              node.properties?.href === ""
            ) {
              delete node.properties.href;
            }
          });
        })
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
              const publicPathRel = path.join(baseUrl, imageDir, decodedUrl);
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
                node.properties.src = `${publicPathRel}`;
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
