import { Tabs } from "antd";
import store from "../store";
import Monaco from "@/monaco";
import EditPanel from "./edit";
import ErrorBoundary from "@/error-boundary";
import Transcoder, { decrypt } from "@/transcoder";
import { ProFormItemProps } from "@/components/pro/antd/form/type";

const getPureSchema = (
  schema: ProFormItemProps[],
  layout: string | undefined,
  column: number | undefined,
  title: string | undefined,
  onSubmit?: string
) => {
  return `export default ${JSON.stringify(
    {
      type: "Form",
      title,
      layout,
      column,
      schema,
      onSubmit,
    },
    null,
    2
  )}`;
};

export default () => {
  const { schema, layout, column, title, onSubmit, dependencies } =
    store.useStore();
  const source = getPureSchema(schema, layout, column, title, onSubmit);
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
                  code={decrypt(source)}
                  dependencies={dependencies}
                />
              </ErrorBoundary>
            ),
          },
          {
            label: "模型",
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
          {
            label: "转译",
            key: "4",
            children: (
              <Monaco
                value={decrypt(source)}
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
