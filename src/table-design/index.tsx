import {
  MenuOutlined,
  PlusSquareOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import TableModal from "./modal/table";
import CellModal from "./modal/cell";
import store from "./store";
import { useRef } from "react";
import { uuid } from "@/components/shared";
import FilterDrawer from "./filter-drawer";
import RenderTitle from "./render-title";
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
          <Button
            type="primary"
            icon={<SettingOutlined />}
            onClick={() => {
              store.mutate.openTableModal = true;
            }}
          >
            设置表格
          </Button>
          <Button
            icon={<MenuOutlined />}
            onClick={() => {
              store.mutate.openFilterDrawer = true;
            }}
          >
            调整顺序
          </Button>
        </Space>
      </div>
      <div className="table-area">
        <Table
          ref={tableRef}
          bordered
          scroll={{
            x: state.columns.length * 206,
          }}
          columns={state.columns.map((item: any, index: number) => {
            return {
              ...item,
              width: 200,
              title: <RenderTitle index={index} />,
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
      {/* <TableModal /> */}
      {state.openCellModal.open && <CellModal />}
      {state.openFilterDrawer && <FilterDrawer />}
      {state.openTableModal && <TableModal />}
    </div>
  );
};
