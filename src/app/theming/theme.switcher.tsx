import { Switch } from "antd";
import { useThemeStore } from "./theme.store";

const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useThemeStore();

  return (
    <Switch
      onClick={toggleTheme}
      checkedChildren="L"
      unCheckedChildren="D"
      defaultChecked={mode === "dark"}
    />
  );
};

export { ThemeSwitcher };
