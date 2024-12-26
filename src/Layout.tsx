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
        <Outlet />
        <Footer />
      </div>
    </DarkModeProvider>
  );
};
