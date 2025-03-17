import { FC } from "react";
import { Flex, Modal, Space, Typography } from "antd";

import { SingleUserDto } from "../types";
import { LoginOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

interface UserInfoModalProps {
  user?: SingleUserDto | null;
  open: boolean;
  hideModal: () => void;
}

const UserInfoModal: FC<UserInfoModalProps> = ({ user, open, hideModal }) => {
  return (
    <Modal open={open} onCancel={hideModal} footer={null}>
      <Flex justify="center" vertical style={{ margin: "32px 0" }}>
        <Title style={{ margin: "0" }} level={3}>
          {user?.name}
        </Title>
        <Title level={5}>Contacts</Title>
        <Space size="large">
          <MailOutlined />
          <Link href={`mailto:${user?.email}`}>{user?.email}</Link>
        </Space>
        <Space size="large">
          <PhoneOutlined />
          <Link href={`tel:${user?.phone}`}>{user?.phone}</Link>
        </Space>
        <Space size="large">
          <LoginOutlined />
          <Link href={user?.website}>{user?.website}</Link>
        </Space>
        <Title level={5}>Addess and Company</Title>
        <Space size="large">
          <Text type="secondary">Address: </Text>
          <Text>
            {`${user?.address.street}, ${user?.address.suite}, ${user?.address.city}, ${user?.address.zipcode}`}
          </Text>
        </Space>
        <Space size="large">
          <Text type="secondary">Company: </Text>
          <Text>{user?.company.name}</Text>
        </Space>
      </Flex>
    </Modal>
  );
};

export { UserInfoModal };
