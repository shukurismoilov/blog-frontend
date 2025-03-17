import { FC, useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { Avatar, Select, SelectProps, Flex } from "antd";
import { userSelectStore } from "../stores";
import { BaseEntity } from "../../app/types";

interface UserSelectProps extends SelectProps<number> {
  data?: BaseEntity[];
  needFetch?: boolean;
}

const UserSelect: FC<UserSelectProps> = ({ data, needFetch, ...props }) => {
  const { list, getList, loading, error, clearStore } = userSelectStore(
    useShallow((state) => ({
      list: state.list,
      getList: state.getList,
      loading: state.loading,
      error: state.error,
      clearStore: state.clearStore,
    }))
  );

  const displayData = useMemo(() => {
    const result: BaseEntity[] = needFetch ? list : data || [];

    return result.map((item) => ({
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
    }));
  }, [list, data, needFetch]);

  useEffect(() => {
    if (needFetch) getList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needFetch]);

  useEffect(() => {
    return () => {
      clearStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select
      {...props}
      disabled={loading || !!error}
      options={displayData}
      filterOption={(input, option) =>
        String(option?.label ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    />
  );
};

export { UserSelect };
