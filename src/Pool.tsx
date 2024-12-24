import Header from "./Header";
import { Text, Hero, NewsFeed, Section, Socials } from "./Academic";
import A from "./A";
import Tabs from "./Tabs";
import { useEffect, useState } from "react";

const Intro = () => (
  <Text className="md:col-span-2 mt-8">
    I'm an avid amateur pool player. This page is the pool side of me.
  </Text>
);

export default () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const toggleDark = () => {
    setDarkMode(!darkMode);
  };

  function updateTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    } else {
      // Otherwise, remove it
      setDarkMode(false);
    }
  }

  useEffect(() => {
    // Add an event listener to react to changes in the system's color scheme
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={
        "font-sans md:grid md:grid-cols-3 p-4 md:p-10 max-w-screen-xl dark:text-neutral-100"
      }
    >
      <Hero className="md:col-span-2" />
      <div className="flex flex-col">
        <Socials className="mt-8" toggleDark={toggleDark} />
        <Tabs />
      </div>
      <Intro />
      <div className="max-w-screen-md md:col-span-2">
        <Section header={"Posts"}></Section>
        <Text className="md:col-span-2 mt-8">
          Sometimes I write about pool.
        </Text>
      </div>
    </div>
    // <div>
    //   <Section header={"Travel"}></Section>
    // </div>
  );
};
