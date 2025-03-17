import { FC, useEffect } from "react";
import { Link as RouterLink } from "react-router";
import { useShallow } from "zustand/shallow";
import { Avatar, Flex, Input, List, Select, Typography } from "antd";
import { postsListStore } from "../../stores";
import { userSelectStore } from "../../../users/stores";
import { BaseEntity } from "../../../app/types";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useDebounce } from "../../../app/hooks";

const { Title } = Typography;

const PostsPage: FC = () => {
  const {
    usersList,
    getUserList,
    usersSelectLoading,
    usersSelectError,
    usersSelectClearStore,
  } = userSelectStore(
    useShallow((state) => ({
      usersList: state.list,
      getUserList: state.getList,
      usersSelectLoading: state.loading,
      usersSelectError: state.error,
      usersSelectClearStore: state.clearStore,
    }))
  );

  const searchParams = new URLSearchParams(window.location.search);

  const { list, loading, filter, changeFilter, clearStore } = postsListStore(
    useShallow((state) => ({
      list: state.list,
      loading: state.loading,
      filter: state.filter,
      changeFilter: state.changeFilter,
      clearStore: state.clearStore,
    }))
  );

  useEffect(() => {
    getUserList();

    return () => {
      clearStore();
      usersSelectClearStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = useDebounce(filter?.title, 500);

  useEffect(() => {
    changeFilter?.({ title: search, userId: filter?.userId }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <List
        header={
          <Flex
            style={{ width: "100%" }}
            justify="flex-end"
            gap={12}
            align="center"
          >
            <Title level={2} style={{ margin: "0 auto 0 0" }}>
              Posts
            </Title>
            <Input
              style={{ width: 320 }}
              prefix={<SearchOutlined />}
              placeholder="Search by title"
              value={filter?.title}
              onChange={(e) => {
                changeFilter?.({
                  title: e.target.value,
                  userId: filter?.userId,
                });
                searchParams.set("title", e.target.value.trim());
              }}
            />
            <Select
              allowClear
              prefix={!filter?.userId ? <UserOutlined /> : null}
              style={{ width: 260 }}
              loading={usersSelectLoading}
              disabled={usersSelectLoading || !!usersSelectError}
              placeholder="Select author"
              value={filter?.userId}
              onChange={(value) => {
                changeFilter?.({ title: filter?.title, userId: value }, true);
                searchParams.set("userId", String(value));
              }}
              options={usersList.map((item: BaseEntity) => ({
                value: item.id,
                label: (
                  <Flex align="center">
                    <Avatar
                      shape="circle"
                      size="small"
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`}
                    />
                    {item.name}
                  </Flex>
                ),
              }))}
              filterOption={(input, option) =>
                String(option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Flex>
        }
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
        dataSource={list.map((post) => ({
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
    </>
  );
};

export { PostsPage };
