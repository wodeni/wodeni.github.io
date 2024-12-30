import { Socials } from "./Academic";
import NotesIndex from "./components/NoteIndex";
import Tabs from "./components/Tabs";
import { Hero } from "./Pool";

export default () => {
  return (
    <>
      <Hero className="md:col-span-2" />
      <div className="flex flex-col">
        <Socials className="mt-8" />
        <Tabs />
      </div>
      <div className="col-span-3">
        <NotesIndex showTags={true}></NotesIndex>
      </div>
    </>
  );
};
