import { FC } from "react";
import { ThemeProvider } from "./theming";
import { HomePage } from "../home/pages";

const App: FC = () => {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
};

export { App };
