import { Text, NewsFeed, Section, Socials } from "./Academic";
import Tabs from "./components/Tabs";
import { useEffect, useState } from "react";
import theme from "./theme";
import Balls from "./components/Balls";
import Logo from "./Logo";
import A from "./components/A";
import NotesIndex from "./components/NoteIndex";
import { Link } from "react-router-dom";

export const Hero = ({ className }: { className?: string }) => (
  <div className={className}>
    <div className="flex h-44">
      <div className="w-48 h-48">
        <Balls color={theme.colors.primary} mode={"pool"} />
      </div>
      <Logo className="w-44 ml-4 mt-8" />
    </div>
  </div>
);

const Intro = () => (
  <Text className="md:col-span-2 mt-8">
    I'm an avid amateur pool player. This page is the pool side of me.
  </Text>
);

const Background = () => (
  <Text>
    I got into billiards as a teenager, first playing Chinese 8-ball and then
    snooker. I didn't play much during undergrad and finally switched to
    American pool at the start of my Ph.D. in 2018. Since then, I've been mostly
    focused on rotation games like 9-ball and 10-ball.
  </Text>
);

const NoteHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold">{children}</h2>
);

export default () => {
  return (
    <>
      <Hero className="md:col-span-2" />
      <div className="flex flex-col">
        <Socials className="mt-8" />
        <Tabs />
      </div>
      <div className="flex flex-col md:col-span-2">
        <Intro />
        <Section header={"Notes"}>
          <Text>
            I keep some Obsidian notes on pool, including practice sessions,
            drills, and reflections on past competitions. Here are some more
            organized ones, see{" "}
            <Link to="/pool/notes">
              <A>here for all the notes </A>
            </Link>
            .
          </Text>
          <NoteHeader>Drills</NoteHeader>
          <NotesIndex tag="drill" />
          <NoteHeader>Tournaments</NoteHeader>
          <NotesIndex tag="tournament" />
          <NoteHeader>Practice notes</NoteHeader>
          <NotesIndex tag="journal" />
        </Section>
        <Section header={"Background"}>
          <Background />
        </Section>
      </div>
    </>
  );
};
