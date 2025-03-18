import { FC, useEffect } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { UserSelect } from "../../../users/selects";
import { Flex, Input, Typography } from "antd";
import { useDebounce } from "../../../app/hooks";
import { postsListStore } from "../../stores";
import { useShallow } from "zustand/shallow";

const { Title } = Typography;

const PostsFilter: FC = () => {
  const { filter, changeFilter } = postsListStore(
    useShallow((state) => ({
      loading: state.loading,
      filter: state.filter,
      changeFilter: state.changeFilter,
    }))
  );

  const search = useDebounce(filter?.title, 500);
  const searchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    changeFilter?.({ title: search, userId: filter?.userId }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Flex style={{ width: "100%" }} justify="flex-end" gap={12} align="center" wrap>
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
      <UserSelect
        needFetch
        allowClear
        prefix={!filter?.userId ? <UserOutlined /> : null}
        style={{ width: 260 }}
        placeholder="Select author"
        value={filter?.userId}
        onChange={(value) => {
          changeFilter?.({ title: filter?.title, userId: value }, true);
          searchParams.set("userId", String(value));
        }}
      />
    </Flex>
  );
};

export { PostsFilter };
