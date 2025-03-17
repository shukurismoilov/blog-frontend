import { FC, useEffect } from "react";
import { Link as RouterLink } from "react-router";
import { useShallow } from "zustand/shallow";
import { Avatar, List } from "antd";
import { postsPaginatedListStore } from "../../stores";

const PostsPage: FC = () => {
  const { list, loading, clearStore } = postsPaginatedListStore(
    useShallow((state) => ({
      list: state.list,
      loading: state.loading,
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
    <>
      <List
        loading={loading}
        itemLayout="vertical"
        size="large"
        pagination={{
          position: "top",
          align: "end",
          onChange: async (page, pageSize) => {
            console.log(page, pageSize);
          },
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
        dataSource={list.map((post) => ({
          href: `/posts/${post.id}`,
          title: post.title,
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
            />
            {item.content}
          </List.Item>
        )}
      />
    </>
  );
};

export { PostsPage };
