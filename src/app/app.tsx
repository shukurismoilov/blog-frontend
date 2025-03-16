import { FC } from "react";
import { ThemeProvider } from "./theming";
import { Typography } from "antd";

const { Text } = Typography;

const App: FC = () => {
  return (
    <ThemeProvider>
      <div style={{ minHeight: "calc(100vh - 182px)" }}>
        <Text>Content</Text>
      </div>
    </ThemeProvider>
  );
};

export { App };
