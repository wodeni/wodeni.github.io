import { Socials } from "../Academic";
import Tabs from "./Tabs";
import { Hero } from "../Pool";
import { NoteEntry } from "../notes";
import Tags from "./Tags";

export default function ({ note }: { note: NoteEntry }) {
  return (
    <>
      <Hero className="md:col-span-2" />
      <div className="flex flex-col">
        <Socials className="mt-8" />
        <Tabs />
      </div>
      <main className="note-content prose lg:prose-xl dark:prose-invert max-w-screen-lg px-2 py-4 md:col-span-3">
        <div className="mb-8">
          <h1 className="text-bold text-3xl">
            {note.frontmatter?.title ?? ""}
          </h1>
          {/* tags */}
          {note.frontmatter?.tags && <Tags tags={note.frontmatter.tags} />}
        </div>

        <div dangerouslySetInnerHTML={{ __html: note.html }}></div>
      </main>
    </>
  );
}
