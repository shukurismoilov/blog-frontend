import { FC } from "react";
import { Layout, Typography } from "antd";
import { useThemeStore } from "../../theming";
import { useShallow } from "zustand/shallow";

const { Footer: LayoutFooter } = Layout;
const { Text, Link } = Typography;

const Footer: FC = () => {
  const { mode } = useThemeStore(
    useShallow((state) => ({
      mode: state.mode,
    }))
  );

  return (
    <LayoutFooter
      style={{
        marginTop: "32px",
        textAlign: "center",
        borderTop:
          mode === "dark"
            ? "1px solid #303030"
            : "1px solid rgb(221, 221, 221)",
      }}
    >
      <Text>
        Blogg &copy; {new Date().getFullYear()} Created by{" "}
        <Link href="https://github.com/shukurismoilov" target="_blank">
          shukurismoilov
        </Link>
      </Text>
    </LayoutFooter>
  );
};

export { Footer };
