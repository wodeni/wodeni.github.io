// plugins/vite-plugin-remark.mjs
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

// Utility to detect external URLs
function isUrl(url) {
  return /^https?:\/\//.test(url) || url.startsWith("//");
}

// Cross-platform normalization (e.g. on Windows)
function normalizePath(str) {
  return str.replace(/\\/g, "/");
}

/**
 * A Vite plugin that:
 *  1) Parses frontmatter in .md via `remark-frontmatter` + `remark-parse-frontmatter`.
 *  2) Processes Wiki links, GFM, raw HTML, slug/heading autolinks, etc.
 *  3) Copies local images into a designated folder in your "public" or output structure.
 *  4) Rewrites local `.md` links to `.html`.
 *  5) Exports a JSON object: { frontmatter: { ... }, html: "<h1>…</h1>" }
 *
 * @param {object} options
 * @param {string} [options.imageDir='images']  - Subfolder in `public` to copy images. E.g. "images" => "/public/images"
 * @param {string} [options.publicDir='public'] - The root public folder
 * @returns {import('vite').Plugin}
 */
export default function vitePluginRemarkMarkdown(
  options: { imageDir?: string; publicDir?: string } = {}
) {
  const { imageDir = "images", publicDir = "public" } = options;

  // We’ll copy images to:  <projectRoot>/<publicDir>/<imageDir>
  const absPublicImages = path.resolve(process.cwd(), publicDir, imageDir);

  // Ensure that folder exists
  fs.mkdir(absPublicImages, { recursive: true }).catch(() => {
    /* ignore errors in creation */
  });

  return {
    name: "vite-plugin-remark-markdown",

    // Only transform .md files
    async transform(code, id) {
      if (!id.endsWith(".md")) return null;

      // The directory where the MD file actually lives
      const mdDir = path.dirname(id);

      // 1) Build a `unified` processor with all your remark/rehype plugins
      const processor = unified()
        // Parse the raw Markdown text
        .use(remarkParse)
        // Parse frontmatter into `file.data.frontmatter`
        .use(remarkFrontmatter)
        .use(remarkParseFrontmatter)
        // Wiki links => transforms [[Page]] into links
        .use(remarkWikiLink, {
          pageResolver: (name) => [normalizePath(name)],
          hrefTemplate: (permalink) => permalink.replace(/\.md$/, ""),
        })
        // GFM (GitHub-Flavored Markdown: tables, strikethrough, etc.)
        .use(remarkGfm)
        // Custom plugin: rewrite `.md` links => `.html`
        .use(() => (tree) => {
          visit(tree, "link", (node) => {
            if (!isUrl(node.url) && node.url.endsWith(".md")) {
              node.url = normalizePath(node.url).replace(/\.md$/, ".html");
            }
          });
        })
        // Convert Markdown (MDAST) => HTML (HAST)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSlug)
        // Custom plugin: copy local images and rewrite <img src="...">
        .use(() => async (tree) => {
          const promises = [];
          visit(tree, ["image", "element"], (node) => {
            // If node.tagName === 'img' or type === 'image', handle the node
            if (
              (node.type === "element" && node.tagName === "img") ||
              node.type === "image"
            ) {
              const src = node.properties?.src || node.url;
              if (src && !isUrl(src)) {
                // We have a local image path
                const decodedUrl = decodeURI(src);
                // Final path (relative) in the public folder
                const publicPathRel = path.join(imageDir, decodedUrl);
                const absPublicPath = path.join(absPublicImages, decodedUrl);

                // The original file (absolute)
                // If code is from `id`, we need to make sure we remove 'file://' if present.
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

                // Rewrite <img src=...> to the new relative path from final HTML
                // We typically reference them with a leading slash or relative path
                // For a .md-based route, you might do `./${imageDir}/...`
                // but using an absolute slash /images is also common.
                // Here, let's do a relative path:  "./images/something.png"
                if (node.properties) {
                  node.properties.src = `/${publicPathRel}`;
                } else {
                  node.url = `/${publicPathRel}`;
                }
              }
            }
          });
          await Promise.all(promises);
        })
        .use(rehypeAutolinkHeadings, { behavior: "append" })
        .use(rehypeInferTitleMeta)
        .use(rehypeStringify, { allowDangerousHtml: true });

      // 2) Process the Markdown content
      const file = await processor.process(code);

      // frontmatter is in `file.data.frontmatter`
      const frontmatter = file.data.frontmatter || {};

      // The final HTML is in file.value
      const html = String(file.value);

      // If you’d like to rename or unify these fields, feel free.
      // We'll return: { frontmatter: {...}, html: "..." }
      const output = {
        frontmatter,
        html,
      };

      // 3) Export as ESM code: `export default { frontmatter: {...}, html: "..." }`
      return {
        code: `export default ${JSON.stringify(output)}`,
        map: null,
      };
    },
  };
}
