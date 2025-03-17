import { FC, useEffect, useState } from "react";
import { Avatar, Button, Divider, Flex, Image, Space, Typography } from "antd";
import { postsCommentsStore, postSingleStore } from "../../stores";
import { useShallow } from "zustand/shallow";
import { usePageTitle } from "../../../app/hooks";
import { userSingleStore } from "../../../users/stores/user-single.store";
import { UserInfoModal } from "../../../users/modals";

const { Title, Link, Paragraph } = Typography;

const SinglePostPage: FC = () => {
  const [openUserInfo, setOpenUserInfo] = useState(false);

  const { post, postLoading, postError } = postSingleStore(
    useShallow((state) => ({
      post: state.single,
      postLoading: state.loading,
      postError: state.error,
    }))
  );

  const { comments, commentsLoading, commentsError } = postsCommentsStore(
    useShallow((state) => ({
      comments: state.list,
      commentsLoading: state.loading,
      commentsError: state.error,
    }))
  );

  const { user, getUser, userLoading, userError } = userSingleStore(
    useShallow((state) => ({
      user: state.single,
      getUser: state.getSingle,
      userLoading: state.loading,
      userError: state.error,
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
      <div style={{ maxWidth: "1140px" }}>
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
            shape="round"
            style={{ marginLeft: "auto" }}
            type="default"
            onClick={() => setOpenUserInfo(true)}
          >
            About
          </Button>
        </Flex>

        <Paragraph style={{ fontSize: "1.1rem" }}>{post?.body}</Paragraph>

        <Title level={3} style={{ marginTop: "64px" }}>
          Comments
        </Title>
        <Divider />
        {comments.map((comment) => (
          <Space key={comment.id} direction="vertical">
            <Space align="center">
              <Avatar
                shape="circle"
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${comment.id}`}
              />
              <Link
                href={`mailto:${comment.email}`}
                style={{ fontWeight: "bold" }}
              >
                {comment.email}
              </Link>
            </Space>
            <Paragraph style={{ maxWidth: "800px" }}>{comment.body}</Paragraph>
          </Space>
        ))}
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
