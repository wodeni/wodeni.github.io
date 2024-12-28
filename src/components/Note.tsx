import { Socials } from "../Academic";
import Tabs from "./Tabs";
import "./Note.css";
import { Hero } from "../Pool";
import { NoteEntry } from "../notes";

export default function ({ note }: { note: NoteEntry }) {
  return (
    <>
      <Hero className="md:col-span-2" />
      <div className="flex flex-col">
        <Socials className="mt-8" />
        <Tabs />
      </div>
      <main className="note-content prose lg:prose-xl dark:prose-invert max-w-screen-lg p-4 md:col-span-3">
        <h1 className="text-bold text-3xl">{note.frontmatter?.title ?? ""}</h1>
        <div dangerouslySetInnerHTML={{ __html: note.html }}></div>
      </main>
    </>
  );
}
