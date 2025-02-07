import { Tabs } from "antd";
import store from "../store";
import Monaco from "@/monaco";
import EditPanel from "./edit";
import ErrorBoundary from "@/error-boundary";
import Transcoder, { decrypt } from "@/transcoder";

const getPureSchema = (state: any) => {
  return JSON.stringify(
    {
      type: "Form",
      title: state.title,
      layout: state.layout,
      selectKey: state.selectKey,
      column: state.column,
      schema: state.schema,
      okText: state.okText,
      onSubmit: state.onSubmit,
    },
    null,
    2
  );
};

export default () => {
  const state = store.useSnapshot();
  const source = getPureSchema(state);
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
              <ErrorBoundary>
                <Transcoder
                  code={decrypt(`export default ${source}`)}
                  dependencies={state.dependencies}
                />
              </ErrorBoundary>
            ),
          },
          {
            label: "JSON Schema",
            key: "3",
            children: (
              <Monaco
                value={source}
                readOnly
                language="json"
                theme="vs"
                style={{ height: "calc(100vh - 70px)" }}
              />
            ),
          },
          {
            label: "数据模型",
            key: "4",
            children: (
              <Monaco
                value={decrypt(`export default ${source}`)}
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
