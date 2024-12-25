import { Outlet } from "react-router-dom";
import { Text, Hero, NewsFeed, Section, Socials, Footer } from "./Academic";
import Tabs from "./components/Tabs";
import { useContext } from "react";
import { DarkModeContext, DarkModeProvider } from "./context/DarkModeContext";

export default () => {
  return (
    <DarkModeProvider>
      <div
        className={
          "font-sans md:grid md:grid-cols-3 p-4 md:p-10 max-w-screen-xl dark:text-neutral-100 min-h-screen md:grid-rows-[200px]"
        }
      >
        <Hero className="md:col-span-2" />
        <div className="flex flex-col">
          <Socials className="mt-8" />
          <Tabs />
        </div>
        <Outlet />
        <Footer />
      </div>
    </DarkModeProvider>
  );
};
