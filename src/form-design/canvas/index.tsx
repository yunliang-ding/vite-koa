import { Tabs } from "antd";
import store from "../store";
import Monaco from "@/monaco";
import Designer from "./design";
import { getPureStringModule } from "@/components/transcoder";

export default () => {
  const snap = store.useSnapshot();
  const source = getPureStringModule({
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
            children: <Designer source={source} />,
          },
          {
            label: "标准模型",
            key: "3",
            children: (
              <Monaco
                value={source}
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
