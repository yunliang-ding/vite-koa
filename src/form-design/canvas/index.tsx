import { Tabs } from "antd";
import store from "../store";
import Monaco from "../../monaco";
import EditPanel from "./edit";
import ErrorBoundary from "../../error-boundary";
import Transcoder from "../../pages/playground/transcoder";
import { ProFormItemProps } from "../../components/pro/antd/form/type";

const getPureSchema = (
  schema: ProFormItemProps[],
  layout: string | undefined,
  column: number | undefined,
  title: string | undefined,
  api: string
) => {
  const str = JSON.stringify(
    {
      type: "Form",
      title,
      layout,
      column,
      schema,
    },
    null,
    2
  );
  return `export default {
      ${str.substring(1, str.length - 2)},
      onSubmit: async (values) => {
        await axios.post("${api}", {
          ...values
        })
      }
    }
`;
};

export default () => {
  const { schema, layout, column, title, api } = store.useStore();
  const source = getPureSchema(schema, layout, column, title, api);
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
                <Transcoder code={source} dependencies={["axios"]} />
              </ErrorBoundary>
            ),
          },
          {
            label: "模型",
            key: "3",
            children: <Monaco readOnly value={source} />,
          },
        ]}
      />
    </div>
  );
};
