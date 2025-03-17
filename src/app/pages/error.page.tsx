import { Button, ConfigProvider, Result, theme } from "antd";
import { Link } from "react-router";
import { useThemeStore } from "../theming";
import { useShallow } from "zustand/shallow";
import { usePageTitle } from "../hooks";

const ErrorPage = () => {
  const { mode } = useThemeStore(
    useShallow((state) => ({
      mode: state.mode,
    }))
  );

  usePageTitle("500");

  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorBgContainer: mode === "dark" ? "#333" : "#ffffff",
          colorBgBase: mode === "dark" ? "#141414" : "#ffffff",
        },
      }}
    >
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
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

export { ErrorPage };
