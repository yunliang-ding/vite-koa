import { EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { create } from "@shined/reactive";
import { Space, Table } from "antd";
import "./index.less";

const store = create({
  columns: [
    {
      title: "ID",
      dataIndex: "id",
    },
  ],
});

export default () => {
  const state = store.useSnapshot();
  return (
    <div className="table-design-wrap">
      <div className="table-area">
        <Table
          columns={state.columns.map((item) => {
            return {
              ...item,
              title: (
                <Space>
                  <span>{item.title}</span>
                  <a>
                    <EditOutlined />
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
          style={{ width: state.columns.length * 100 + 80 }}
        />
        <div className="plus-add-icon">
          <a><PlusSquareOutlined style={{fontSize: 18}} /></a>
        </div>
      </div>
    </div>
  );
};
