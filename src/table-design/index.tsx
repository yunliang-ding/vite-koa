import {
  RestOutlined,
  EditOutlined,
  MenuOutlined,
  PlusSquareOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import CellModal from "./modal/cell";
import store from "./store";
import { useRef } from "react";
import { uuid } from "@/components/shared";
import FilterDrawer from "./filter-drawer";
import "./index.less";

export default () => {
  const state = store.useSnapshot();
  const addColumn = () => {
    store.mutate.columns.push({
      title: "",
      dataIndex: uuid(),
    });
    const el = tableRef.current?.querySelector(".ant-table-content");
    if (el) {
      setTimeout(() => {
        el.scrollLeft = 99999;
      });
    }
  };
  const tableRef = useRef<HTMLDivElement>(null);
  return (
    <div className="table-design-wrap">
      <div className="table-tools">
        <Space>
          <Button type="primary" icon={<SettingOutlined />}>
            设置表格
          </Button>
          <Button
            icon={<MenuOutlined />}
            onClick={() => {
              store.mutate.openFilterDrawer = true;
            }}
          />
        </Space>
      </div>
      <div className="table-area">
        <Table
          ref={tableRef}
          scroll={{
            x: state.columns.length * 206,
          }}
          columns={state.columns.map((item: any) => {
            return {
              ...item,
              title: (
                <Space>
                  <Input
                    placeholder="标题"
                    defaultValue={item.title}
                    onChange={(e) => {
                      item.title = e.target.value;
                    }}
                  />
                  <a
                    style={{ marginRight: 12 }}
                    onClick={() => {
                      store.mutate.openCellModal = true;
                    }}
                  >
                    <EditOutlined />
                  </a>
                  <a>
                    <RestOutlined />
                  </a>
                </Space>
              ),
              render() {
                return <span style={{ color: "#999" }}>-</span>;
              },
            };
          })}
          dataSource={[{}]}
          pagination={false}
          style={{ width: "calc(100% - 70px)" }}
        />
        <div className="plus-add-icon" onClick={addColumn}>
          <a>
            <PlusSquareOutlined style={{ fontSize: 18 }} />
          </a>
        </div>
      </div>
      <CellModal />
      <FilterDrawer />
    </div>
  );
};
