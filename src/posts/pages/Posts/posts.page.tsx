import { FC, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { Alert, List } from "antd";
import { postsListStore } from "../../stores";
import { userSelectStore } from "../../../users/stores";
import { usePageTitle } from "../../../app/hooks";
import { PostsFilter } from "./posts.filter";
import { PostListCard } from "../../cards";

const PostsPage: FC = () => {
  const { usersList } = userSelectStore(
    useShallow((state) => ({
      usersList: state.list,
    }))
  );

  const { posts, loading, error, clearStore } = postsListStore(
    useShallow((state) => ({
      posts: state.list,
      loading: state.loading,
      error: state.error,
      clearStore: state.clearStore,
    }))
  );

  usePageTitle(!loading ? `Posts` : `Post loading...`);

  useEffect(() => {
    return () => {
      clearStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error)
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );

  return (
    <List
      header={<PostsFilter />}
      loading={loading}
      itemLayout="vertical"
      size="large"
      pagination={{
        position: "bottom",
        align: "end",
        onChange: async (page, pageSize) => {
          console.log(page, pageSize);
        },
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
      }}
      dataSource={posts.map((post) => ({
        id: post.id,
        href: `/posts/${post.id}`,
        title: post.title,
        author: usersList.find((user) => user.id === post.userId)?.name,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${post.userId}`,
        content: post.body,
      }))}
      renderItem={(item) => (
        <PostListCard
          key={item.id}
          loading={loading}
          href={item.href}
          title={item.title}
          author={item.author}
          avatar={item.avatar}
          content={item.content}
        />
      )}
    />
  );
};

export { PostsPage };
