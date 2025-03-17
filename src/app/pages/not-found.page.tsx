import { Button, ConfigProvider, Result, theme } from "antd";
import { Link } from "react-router";
import { useThemeStore } from "../theming";
import { useShallow } from "zustand/shallow";
import { usePageTitle } from "../hooks";

const NotFoundPage = () => {
  const { mode } = useThemeStore(
    useShallow((state) => ({
      mode: state.mode,
    }))
  );

  usePageTitle("404");
  
  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        // token: {
        //   colorBgContainer: mode === "dark" ? "#333" : "#ffffff",
        //   colorBgBase: mode === "dark" ? "#141414" : "#ffffff",
        // },
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button size="large" shape="round" type="primary">
              Back Home
            </Button>
          </Link>
        }
      />
    </ConfigProvider>
  );
};

export { NotFoundPage };
