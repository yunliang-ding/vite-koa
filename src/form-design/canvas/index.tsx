import { Tabs } from "antd";
import ProForm from "../../components/pro/antd/form";
import store from "../store";
import Monaco from "../../monaco";
import EditPanel from "./edit";

export default () => {
  const { schema, layout, column } = store.useStore();
  return (
    <div className="canvas">
      <Tabs
        defaultActiveKey="1"
        size="small"
        style={{
          background: "#fff",
          padding: "0 10px",
          width: "100%",
          height: "100%",
        }}
        items={[
          {
            label: "编辑",
            key: "1",
            children: <EditPanel />,
          },
          {
            label: "预览",
            key: "2",
            children: (
              <ProForm layout={layout} column={column} schema={schema} />
            ),
          },
          {
            label: "模型",
            key: "3",
            children: <Monaco readOnly value={store.getPureSchema()} />,
          },
        ]}
      />
    </div>
  );
};
