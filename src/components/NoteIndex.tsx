// src/NotesIndex.tsx
import { Link } from "react-router-dom";
import { notes } from "../notes"; // from step #2
import Tags from "./Tags";

export default function NotesIndex({
  tag,
  showTags,
}: {
  tag?: string;
  showTags?: boolean;
}) {
  const filtered = tag
    ? notes.filter((note) => note.frontmatter?.tags?.includes(tag))
    : notes;
  return (
    <>
      <div className="py-4">
        <ul>
          {filtered
            .sort((a, b) => {
              const dateA = new Date(a.frontmatter?.date);
              const dateB = new Date(b.frontmatter?.date);
              return dateB.getTime() - dateA.getTime();
            })
            .map((note) => (
              <li key={note.slug}>
                <div className="flex flex-row align-center gap-2">
                  <Link to={`/pool/notes/${note.slug}`}>
                    <span className="text-primary text-xl font-bold hover:text-primary/70">
                      {note.frontmatter?.title ?? note.slug}
                    </span>
                  </Link>
                  {showTags && note.frontmatter?.tags && (
                    <Tags tags={note.frontmatter.tags} className="text-xs" />
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
