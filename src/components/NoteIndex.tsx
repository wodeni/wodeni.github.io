// src/NotesIndex.tsx
import { Link } from "react-router-dom";
import { notes } from "../notes"; // from step #2
import Tabs from "./Tabs";
import { Socials } from "../Academic";
import { Hero } from "../Pool";
import Tags from "./Tags";

export default function NotesIndex({ tag }: { tag?: string }) {
  const filtered = tag
    ? notes.filter((note) => note.frontmatter?.tags?.includes(tag))
    : notes;
  return (
    <>
      <div className="py-4">
        <ul>
          {filtered.map((note) => (
            <li key={note.slug}>
              <Link
                to={`/pool/notes/${note.slug}`}
                className="text-primary text-xl font-bold hover:text-primary/70"
              >
                <span className="flex flex-row gap-2">
                  {note.frontmatter?.title ?? note.slug}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
