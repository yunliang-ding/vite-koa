import store from "../store";
import Designer from "./design";
import { getEsModuleString } from "@/components/transcoder";
import { Select, Space } from "antd";

export default () => {
  const snap = store.useSnapshot();
  const source = getEsModuleString({
    type: "Form",
    title: snap.title,
    layout: snap.layout,
    column: snap.column,
    schema: snap.schema,
    okText: snap.okText,
    onSubmit: snap.onSubmit,
    bindVariables: snap.bindVariables,
  });
  return (
    <div className="canvas">
      <div className="canvas-headers">
        <Space>
          <span>当前主题</span>
          <Select
            style={{ width: 160 }}
            size="small"
            defaultValue={"antd"}
            options={[
              {
                label: "Ant Design",
                value: "antd",
              },
              {
                label: "SHINEOUT",
                value: "shineout",
              },
            ]}
          />
        </Space>
      </div>
      <Designer source={source} />
    </div>
  );
};
