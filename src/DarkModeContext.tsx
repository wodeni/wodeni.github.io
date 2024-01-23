import { createContext } from "react";

export type IDarkModeContext = {
  darkMode: boolean;
  toggleDark: () => void;
};

const DarkModeContext = createContext<IDarkModeContext>({
  darkMode: false,
  toggleDark: () => {},
});

export default DarkModeContext;
