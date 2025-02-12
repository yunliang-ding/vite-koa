import { Tabs } from "antd";
import store from "../store";
import Monaco from "@/monaco";
import Designer from "./design";
import { getPureStringModule } from "@/components/transcoder";

export default () => {
  const state = store.useSnapshot();
  const source = getPureStringModule({
    type: "Form",
    title: state.title,
    layout: state.layout,
    column: state.column,
    schema: state.schema,
    okText: state.okText,
    onSubmit: state.onSubmit,
  });
  return (
    <div className="canvas">
      <Tabs
        defaultActiveKey="1"
        size="small"
        style={{
          background: "#fff",
          width: "100%",
          height: "100%",
        }}
        items={[
          {
            label: "设计器",
            key: "1",
            children: <Designer />,
          },
          {
            label: "标准模型",
            key: "3",
            children: (
              <Monaco
                value={`export default ${source}`}
                readOnly
                theme="vs"
                style={{ height: "calc(100vh - 70px)" }}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
