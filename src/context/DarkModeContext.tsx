import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext({
  darkMode: false,
  toggleDark: () => {},
});

export const DarkModeProvider = ({ children }: { children: JSX.Element }) => {
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
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Add an event listener to react to changes in the system's color scheme
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);
  });
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};
