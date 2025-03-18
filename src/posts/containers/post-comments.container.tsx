import { FC } from "react";
import { postsCommentsStore } from "../stores";
import { useShallow } from "zustand/shallow";
import { Alert, Avatar, Divider, Skeleton, Space, Typography } from "antd";

const { Title, Link, Paragraph } = Typography;

const PostCommentsContainer: FC = () => {
  const { comments, loading, error } = postsCommentsStore(
    useShallow((state) => ({
      comments: state.list,
      loading: state.loading,
      error: state.error,
    }))
  );

  if (error)
    return (
      <Alert
        message="Error"
        description="Something went wrong cannot load comments"
        type="error"
        showIcon
      />
    );

  return (
    <>
      <Title level={3} style={{ marginTop: "64px" }}>
        Comments
      </Title>
      <Divider />
      <Skeleton avatar loading={loading} active />
      <Skeleton avatar loading={loading} active />
      <Skeleton avatar loading={loading} active />
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
    </>
  );
};

export { PostCommentsContainer };
