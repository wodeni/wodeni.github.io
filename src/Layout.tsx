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
          "min-h-screen max-w-screen-xl px-5 py-6 font-sans dark:text-neutral-100 md:grid md:grid-cols-3 md:grid-rows-[200px] md:p-10 lg:p-12"
        }
      >
        <Outlet />
        <Footer />
      </div>
    </DarkModeProvider>
  );
};
