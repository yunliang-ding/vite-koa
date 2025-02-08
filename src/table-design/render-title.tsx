import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useRef } from "react";
import store from "./store";

export default ({ index }: { index: number }) => {
  const { title } = store.mutate.columns[index];
  const inputRef = useRef<any>();
  return (
    <Space>
      <Input
        placeholder="标题"
        ref={inputRef}
        autoFocus
        defaultValue={title}
        onChange={(e) => {
          store.mutate.columns[index].title = e.target.value;
          store.mutate.columns = [...store.mutate.columns];
        }}
      />
      <Button
        size="small"
        type="link"
        onClick={() => {
          if (!title) {
            // 输入框聚焦
            inputRef.current.focus();
          } else {
            store.mutate.openCellModal = {
              open: true,
              index,
            };
          }
        }}
      >
        <EditOutlined />
      </Button>
      <Button
        size="small"
        type="link"
        disabled={store.mutate.columns?.length === 1}
        onClick={() => {
          store.mutate.columns.splice(index, 1);
          store.mutate.columns = [...store.mutate.columns];
        }}
      >
        <RestOutlined />
      </Button>
    </Space>
  );
};
