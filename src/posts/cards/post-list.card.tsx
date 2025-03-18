import { FC } from "react";
import { Link as RouterLink } from "react-router";
import { Avatar, List, Skeleton } from "antd";

interface PostListCardProps {
  loading: boolean;
  avatar: string;
  title: string;
  content: string;
  author?: string;
  href: string;
}

const PostListCard: FC<PostListCardProps> = ({
  loading,
  avatar,
  title,
  content,
  author,
  href,
}) => {
  return (
    <List.Item
      extra={
        !loading && (
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        )
      }
    >
      <Skeleton loading={loading} active avatar>
        <List.Item.Meta
          avatar={<Avatar src={avatar} />}
          title={<RouterLink to={href}>{title}</RouterLink>}
          description={`by ${author}`}
        />
        {content}
      </Skeleton>
    </List.Item>
  );
};

export { PostListCard };
