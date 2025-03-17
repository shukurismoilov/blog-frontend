import { FC, useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { Avatar, Select, Space, SelectProps } from "antd";
import { userSelectStore } from "../stores";
import { BaseEntity } from "../../app/types";

interface UserSelectProps extends SelectProps<number> {
  label?: string;
  data?: BaseEntity[];
  needFetch?: boolean;
}

const UserSelect: FC<UserSelectProps> = ({
  label,
  placeholder,
  data,
  value,
  onChange,
  needFetch,
  ...props
}) => {
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
        <Space>
          <Avatar
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`}
          />
          {item.name}
        </Space>
      ),
    }));
  }, [list, data, needFetch]);

  useEffect(() => {
    if (needFetch) getList();
  }, [needFetch, getList]);

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
      title={label}
      placeholder={placeholder || "Select user"}
      value={value}
      onChange={onChange}
      options={displayData}
      filterOption={(input, option) =>
        String(option?.label.props.children[1] ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    />
  );
};

export { UserSelect };
