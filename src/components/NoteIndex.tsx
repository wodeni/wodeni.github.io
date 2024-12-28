// src/NotesIndex.tsx
import { Link } from "react-router-dom";
import { notes } from "../notes"; // from step #2
import Tabs from "./Tabs";
import { Socials } from "../Academic";
import { Hero } from "../Pool";

export default function NotesIndex() {
  return (
    <>
      <div className="p-4">
        <ul>
          {notes.map((note) => (
            <li key={note.slug}>
              <Link
                to={`/pool/notes/${note.slug}`}
                className="text-primary text-xl font-bold"
              >
                {note.frontmatter?.title ?? note.slug}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
