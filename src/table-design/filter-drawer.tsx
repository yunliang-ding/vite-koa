/* eslint-disable react-hooks/rules-of-hooks */
import { Drawer, Space } from "antd";
import { HolderOutlined } from "@ant-design/icons";
import Drag from "@/components/material/drag";
import store from "./store";

export default () => {
  const state = store.useSnapshot();
  return (
    <Drawer
      open={state.openFilterDrawer}
      onClose={() => {
        store.mutate.openFilterDrawer = false;
      }}
      {...{
        title: "位置调整",
        width: 300,
        footer: false,
        style: {
          minWidth: 300,
        },
      }}
    >
      <div className="ant-table-filter">
        <Drag
          style={{
            gap: 20,
          }}
          selected={false}
          onChange={(items: any) => {
            // 调整顺序
            store.mutate.columns = items.map((i: any) => i.column);
          }}
          items={state.columns.map((column: any) => {
            return {
              key: column.dataIndex,
              column,
              content: (
                <div>
                  <div className="ant-table-filter-item">
                    <Space>
                      <HolderOutlined />
                      {column.title}
                    </Space>
                  </div>
                </div>
              ),
            };
          })}
        />
      </div>
    </Drawer>
  );
};
