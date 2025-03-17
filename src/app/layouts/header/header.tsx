import { FC, useState } from "react";
import { Link as RouterLink } from "react-router";
import { Button, Col, Layout, Row, Grid } from "antd";
import { ThemeSwitcher, useThemeStore } from "../../theming";
import { useShallow } from "zustand/shallow";
import { SignUpModal } from "../../modals";

const { Header: LayoutHeader } = Layout;
const { useBreakpoint } = Grid;

const Header: FC = () => {
  const screens = useBreakpoint();
  const { mode } = useThemeStore(
    useShallow((state) => ({
      mode: state.mode,
    }))
  );

  const [signUpModalOpened, setSignUpModalOpened] = useState(false);
  const showSignUpModal = () => setSignUpModalOpened(true);
  const hideSignUpModal = () => setSignUpModalOpened(false);

  return (
    <LayoutHeader
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
            <RouterLink
              to="/about"
              style={{
                fontSize: 16,
                color: mode === "dark" ? "#ffffff" : "#000000",
                fontFamily: `"system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif"`,
              }}
            >
              Our story
            </RouterLink>
          </Col>
        )}
        <Col>
          <Button
            shape="round"
            variant="solid"
            size="large"
            type="primary"
            onClick={showSignUpModal}
          >
            Get started
          </Button>
        </Col>
        <ThemeSwitcher />
      </Row>
      <SignUpModal open={signUpModalOpened} hideModal={hideSignUpModal} />
    </LayoutHeader>
  );
};

export { Header };
