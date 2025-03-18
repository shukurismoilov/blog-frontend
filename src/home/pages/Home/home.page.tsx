import { FC } from "react";
import { Button, Image, Row, Col, Typography } from "antd";
import { Link as RouterLink } from "react-router";
import { usePageTitle } from "../../../app/hooks";

const { Title, Paragraph } = Typography;

const HomePage: FC = () => {
  usePageTitle(`Home`);

  return (
    <Row gutter={[32, 32]} align="middle" justify="center">
      <Col sm={{ flex: "100%" }} lg={{ flex: "50%" }}>
        <Title level={1} style={{ fontSize: "4rem" }}>
          Human stories & ideas
        </Title>
        <Paragraph
          style={{
            fontSize: "1.2rem",
            marginBottom: "1.4rem",
          }}
        >
          Welcome to the Blogg website! Here you can find a collection of human
          stories and ideas from around the world. Or at least that's what our
          team thinks. We hope you find something that resonates with you.
        </Paragraph>

        <RouterLink to="/posts">
          <Button variant="solid" type="primary" shape="round" size="large">
            Start Reading
          </Button>
        </RouterLink>
      </Col>
      <Col sm={{ flex: "100%" }} lg={{ flex: "50%" }}>
        <Image
          alt="Welcome image"
          preview={false}
          src="/home-banner.png"
        />
      </Col>
    </Row>
  );
};

export { HomePage };
