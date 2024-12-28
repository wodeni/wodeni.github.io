import { useParams } from "react-router-dom";
import { noteMap } from "../notes.js"; // from step #2
import NoteContent from "./Note.js"; // your snippet

export default function NotePage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <div>No slug provided.</div>;

  const note = noteMap[slug];
  if (!note) return <div>Note not found</div>;

  // Now we have note.html from the plugin.
  return <NoteContent note={note} />;
}
