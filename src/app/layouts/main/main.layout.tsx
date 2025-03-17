import { ConfigProvider, Layout, theme } from "antd";
import { Outlet } from "react-router";
import { useThemeStore } from "../../theming";
import { Footer } from "../footer";
import { Header } from "../header";
const { Content } = Layout;

import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { useShallow } from "zustand/shallow";

dayjs.locale("en");

const MainLayout = () => {
  const { mode } = useThemeStore(
    useShallow((state) => ({
      mode: state.mode,
    }))
  );

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
        <Header />
        <Content
          style={{ minHeight: "calc(100vh - 167px)", padding: "48px 48px 0" }}
        >
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export { MainLayout };
