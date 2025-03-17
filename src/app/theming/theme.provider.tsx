import { FC, ReactNode } from "react";
import { ConfigProvider, theme } from "antd";
import { useThemeStore } from "./theme.store";

import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/en";

dayjs.locale("en");

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const mode = useThemeStore((state) => state.mode);

  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        algorithm:
          mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorBgContainer: mode === "dark" ? "#333" : "#ffffff",
          colorBgBase: mode === "dark" ? "#141414" : "#ffffff",
        },
        components: {
          Typography: {
            fontFamily: "Libre Baskerville, serif",
            algorithm: true,
            colorTextBase: mode === "dark" ? "#ffffff" : "#141414",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export { ThemeProvider };
