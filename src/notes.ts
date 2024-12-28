// src/notes.ts
// Gathers all .md files. Each file is processed into { html, attributes, ... } by the plugin.

const modules = import.meta.glob("../pool-notes/public/**/*.md", {
  eager: true,
});
// or whatever your folder structure is

interface MdExport {
  html: string;
  attributes?: Record<string, unknown>;
}

export type NoteEntry = {
  slug: string;
  html: string;
  frontmatter?: Record<string, string>;
};

function pathToSlug(filePath: string) {
  // Example: "../vault/folder/my-note.md" -> "folder-my-note"
  return filePath
    .replace(/^(\.\.\/pool-notes\/public\/)/, "")
    .replace(/\.md$/, "")
    .replace(/\//g, "-")
    .replace(/\ /g, "-")
    .toLowerCase();
}

export const notes: NoteEntry[] = Object.entries(modules).map(([path, mod]) => {
  // Depending on your plugin, the shape might differ.
  // Often you get something like { html: "...", attributes: {...} }.
  const data = (mod as any).default;
  const slug = pathToSlug(path);

  return {
    slug,
    html: data.html,
    frontmatter: data.frontmatter, // or data.frontmatter, if that’s how your plugin exports it
  };
});

// Optionally, create a quick lookup map by slug:
export const noteMap: Record<string, NoteEntry> = {};
for (const n of notes) {
  noteMap[n.slug] = n;
}
