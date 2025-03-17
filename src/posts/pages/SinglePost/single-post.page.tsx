import { FC, useEffect, useState } from "react";
import { Avatar, Button, Flex, Image, Space, Typography } from "antd";
import { postSingleStore } from "../../stores";
import { useShallow } from "zustand/shallow";
import { usePageTitle } from "../../../app/hooks";
import { userSingleStore } from "../../../users/stores/user-single.store";
import { UserInfoModal } from "../../../users/modals";
import { PostCommentsContainer } from "../../containers";

const { Title, Link, Paragraph } = Typography;

const SinglePostPage: FC = () => {
  const [openUserInfo, setOpenUserInfo] = useState(false);

  const { post } = postSingleStore(
    useShallow((state) => ({
      post: state.single,
    }))
  );

  const { user, getUser } = userSingleStore(
    useShallow((state) => ({
      user: state.single,
      getUser: state.getSingle,
    }))
  );

  useEffect(() => {
    if (post) {
      getUser(post.userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  usePageTitle(post ? `${post.title}` : `Post loading...`);

  return (
    <Flex align="center" vertical>
      <div style={{ maxWidth: "800px" }}>
        <Image
          preview={false}
          alt="post image"
          width="100%"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
        <Title level={1} style={{ maxWidth: "800px", margin: "32px 0 0 0" }}>
          {post?.title}
        </Title>
        <Flex gap={16} align="center">
          <Avatar
            shape="circle"
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user?.id}`}
          />
          <Space size={0} style={{ marginBottom: "16px" }} direction="vertical">
            <Title style={{ marginBottom: "0" }} level={4}>
              {user?.name}
            </Title>
            <Link href={`mailto:${user?.email}`} style={{ fontWeight: "bold" }}>
              {user?.email}
            </Link>
          </Space>
          <Button
            size="large"
            shape="round"
            style={{ marginLeft: "auto" }}
            type="default"
            onClick={() => setOpenUserInfo(true)}
          >
            About author
          </Button>
        </Flex>

        <Paragraph style={{ fontSize: "1.1rem" }}>{post?.body}</Paragraph>

        <PostCommentsContainer />
      </div>
      {user && (
        <UserInfoModal
          user={user}
          open={openUserInfo}
          hideModal={() => setOpenUserInfo(false)}
        />
      )}
    </Flex>
  );
};

export { SinglePostPage };
