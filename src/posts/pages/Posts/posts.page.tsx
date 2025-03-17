import { FC, useEffect } from "react";
import { Link as RouterLink } from "react-router";
import { useShallow } from "zustand/shallow";
import { Avatar, List } from "antd";
import { postsListStore } from "../../stores";
import { userSelectStore } from "../../../users/stores";
import { usePageTitle } from "../../../app/hooks";
import { PostsFilter } from "./posts.filter";

const PostsPage: FC = () => {
  usePageTitle(`Posts`);

  const { usersList } = userSelectStore(
    useShallow((state) => ({
      usersList: state.list,
    }))
  );

  const { posts, loading, clearStore } = postsListStore(
    useShallow((state) => ({
      posts: state.list,
      loading: state.loading,
      filter: state.filter,
      changeFilter: state.changeFilter,
      clearStore: state.clearStore,
    }))
  );

  useEffect(() => {
    return () => {
      clearStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        href: `/posts/${post.id}`,
        title: post.title,
        by: usersList.find((user) => user.id === post.userId)?.name,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${post.userId}`,
        content: post.body,
      }))}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<RouterLink to={item.href}>{item.title}</RouterLink>}
            description={`by ${item.by}`}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export { PostsPage };
