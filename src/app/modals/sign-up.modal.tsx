import { FC } from "react";
import { Button, Col, Modal, Row, Typography } from "antd";
import { Link as RouterLink } from "react-router";
import {
  FacebookFilled,
  GoogleCircleFilled,
  MailFilled,
} from "@ant-design/icons";

const { Title } = Typography;

interface SignUpModal {
  open: boolean;
  hideModal: () => void;
}

const SignUpModal: FC<SignUpModal> = ({ open, hideModal }) => {
  return (
    <Modal open={open} onCancel={hideModal} footer={null}>
      <Row
        align="middle"
        gutter={[16, 16]}
        justify="center"
        style={{ textAlign: "center", margin: "48px 0" }}
      >
        <Col span={24}>
          <Title level={3}>Join Blogg</Title>
        </Col>
        <Col span={24}>
          <RouterLink to="https://google.com">
            <Button
              type="default"
              shape="round"
              icon={<GoogleCircleFilled size={44} />}
            >
              Sign up with Google
            </Button>
          </RouterLink>
        </Col>
        <Col span={24}>
          <RouterLink to="https://facebook.com">
            <Button type="default" shape="round" icon={<FacebookFilled />}>
              Sign up with Facebook
            </Button>
          </RouterLink>
        </Col>
        <Col span={24}>
          <RouterLink to="https://mail.com">
            <Button type="default" shape="round" icon={<MailFilled />}>
              Sign up with email
            </Button>
          </RouterLink>
        </Col>
      </Row>
    </Modal>
  );
};

export { SignUpModal };
