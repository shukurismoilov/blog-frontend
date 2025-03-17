import { FC } from "react";
import { Button, Image, Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

const HomePage: FC = () => {
  return (
    <Row gutter={[32, 32]} align="middle" justify="center">
      <Col sm={{ flex: "100%" }} lg={{ flex: "50%" }}>
        <Title level={1} style={{ fontSize: "64px" }}>
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
        <Button variant="solid" type="primary" shape="round" size="large">
          Start Reading
        </Button>
      </Col>
      <Col sm={{ flex: "100%" }} lg={{ flex: "50%" }}>
        <Image
          alt="Welcome image"
          preview={false}
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
      </Col>
    </Row>
  );
};

export { HomePage };
