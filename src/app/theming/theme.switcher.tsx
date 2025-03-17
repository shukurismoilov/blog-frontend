import { Button, Tooltip } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { useThemeStore } from "./theme.store";

const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useThemeStore();

  return (
    <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
      <Button
        type="default"
        shape="circle"
        style={{
          color: mode === "dark" ? "#ffbf00" : "#141414",
          borderColor: mode === "dark" ? "#ffbf00" : "#141414",
        }}
        icon={mode === "dark" ? <SunFilled /> : <MoonFilled />}
        onClick={toggleTheme}
      />
    </Tooltip>
  );
};

export { ThemeSwitcher };
