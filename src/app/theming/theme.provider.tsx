import { FC, ReactNode } from "react";
import { Button, ConfigProvider, Layout, Space, Typography, theme } from "antd";
import { useThemeStore } from "./theme.store";

import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { ThemeSwitcher } from "./theme.switcher";

dayjs.locale("en");

const { Header, Content, Footer } = Layout;
const { Text, Link } = Typography;

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
          colorPrimary: mode === "dark" ? "#ff4d4f" : "#1677ff",
          colorBgBase: mode === "dark" ? "#141414" : "#ffffff",
          colorTextBase: mode === "dark" ? "#ffffff" : "#000000",
        },
      }}
    >
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo.svg" alt="logo" />
          </a>
          <Space size="large">
            <Link href="/about" style={{ color: "#fff" }}>
              Our story
            </Link>
            <Button
              style={{ backgroundColor: "#fff", color: "#000" }}
              shape="round"
              variant="solid"
              size="large"
              type="default"
            >
              Get started
            </Button>
            <ThemeSwitcher />
          </Space>
        </Header>
        <Content style={{ padding: "48px 48px 0" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          <Text>
            Blogg &copy; {new Date().getFullYear()} Created by{" "}
            <Link href="https://github.com/shukurismoilov" target="_blank">
              shukurismoilov
            </Link>
          </Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export { ThemeProvider };
