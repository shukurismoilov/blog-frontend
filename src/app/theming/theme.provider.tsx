import { FC, ReactNode } from "react";
import {
  Button,
  ConfigProvider,
  Layout,
  Grid,
  Typography,
  theme,
  Row,
  Col,
} from "antd";
import { useThemeStore } from "./theme.store";

import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { ThemeSwitcher } from "./theme.switcher";

dayjs.locale("en");

const { Header, Content, Footer } = Layout;
const { Text, Link } = Typography;
const { useBreakpoint } = Grid;

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const mode = useThemeStore((state) => state.mode);
  const screens = useBreakpoint();

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
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "transparent",
            borderBottom:
              mode === "dark"
                ? "1px solid #303030"
                : "1px solid rgb(221, 221, 221)",
          }}
        >
          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            {mode === "dark" ? (
              <img src="/logo.svg" alt="logo" />
            ) : (
              <img src="/logo-dark.svg" alt="logo" />
            )}
          </a>
          <Row align="middle" gutter={16}>
            {!screens.xs && (
              <Col>
                <Link
                  href="/about"
                  style={{
                    fontSize: 16,
                    color: mode === "dark" ? "#ffffff" : "#000000",
                    fontFamily: `"system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif"`,
                  }}
                >
                  Our story
                </Link>
              </Col>
            )}
            <Col>
              <Button shape="round" variant="solid" size="large" type="primary">
                Get started
              </Button>
            </Col>
            <ThemeSwitcher />
          </Row>
        </Header>
        <Content
          style={{ minHeight: "calc(100vh - 134px)", padding: "48px 48px 0" }}
        >
          {children}
        </Content>
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
