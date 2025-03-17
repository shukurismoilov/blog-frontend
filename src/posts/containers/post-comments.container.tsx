import { FC } from "react";
import { postsCommentsStore } from "../stores";
import { useShallow } from "zustand/shallow";
import { Avatar, Divider, Space, Typography } from "antd";

const { Title, Link, Paragraph } = Typography;

const PostCommentsContainer: FC = () => {
  const { comments, commentsLoading, commentsError } = postsCommentsStore(
    useShallow((state) => ({
      comments: state.list,
      commentsLoading: state.loading,
      commentsError: state.error,
    }))
  );

  return (
    <>
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
    </>
  );
};

export { PostCommentsContainer };
