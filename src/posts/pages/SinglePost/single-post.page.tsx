import { FC, useEffect } from "react";
import { Avatar, Button, Flex, Image, Space, Typography } from "antd";
import { postSingleStore } from "../../stores";
import { useShallow } from "zustand/shallow";
import { usePageTitle } from "../../../app/hooks";
import { userSingleStore } from "../../../users/stores/user-single.store";

const { Title, Text, Paragraph } = Typography;

const SinglePostPage: FC = () => {
  const { post, postLoading, postError, clearPostStore } = postSingleStore(
    useShallow((state) => ({
      post: state.single,
      postLoading: state.loading,
      postError: state.error,
      clearPostStore: state.clearStore,
    }))
  );

  const { comments, commentsLoading, commentsError, clearCommentsStore } =
    postSingleStore(
      useShallow((state) => ({
        list: state.single,
        commentsLoading: state.loading,
        commentsError: state.error,
        clearCommentsStore: state.clearStore,
      }))
    );

  const { user, getUser, userLoading, userError, clearUserStore } =
    userSingleStore(
      useShallow((state) => ({
        user: state.single,
        getUser: state.getSingle,
        userLoading: state.loading,
        userError: state.error,
        clearUserStore: state.clearStore,
      }))
    );

  useEffect(() => {
    if (post) {
      getUser(post.userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  usePageTitle(post ? `${post.title}` : `Post loading...`);

  useEffect(() => {
    return () => {
      clearPostStore();
      clearCommentsStore();
      clearUserStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex align="center" vertical>
      
      <div style={{ maxWidth: "1140px" }}>
        <Image
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
            <Text type="secondary">{user?.email}</Text>
          </Space>
          <Button shape="round" style={{ marginLeft: "auto" }} type="default">
            About
          </Button>
        </Flex>

        <Paragraph>{post?.body}</Paragraph>
      </div>
    </Flex>
  );
};

export { SinglePostPage };
