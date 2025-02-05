import ProForm from "../components/pro/antd/form";
import store from "./store";
import material from "./material-config";
import { Empty, Tabs } from "antd";

export default () => {
  const { selectedSchema } = store.useStore();
  const panelSchema = material[selectedSchema?.type]?.propsConfig;
  return (
    <div className="panel">
      {panelSchema ? (
        <Tabs
          defaultActiveKey="3"
          size="small"
          style={{
            padding: "0 10px",
          }}
          items={[
            {
              label: "Form 设置",
              key: "1",
              children: <FormPanel />,
            },
            {
              label: "Form.Item 设置",
              key: "2",
              children: <FormItemPanel />,
            },
            {
              label: "元素设置",
              key: "3",
              children: (
                <ProForm
                  schema={panelSchema}
                  layout="vertical"
                  initialValues={selectedSchema}
                  onValuesChange={() => {}}
                />
              ),
            },
          ]}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export const FormItemPanel = () => {
  return (
    <ProForm
      layout="vertical"
      schema={[
        {
          type: "Input",
          name: "label",
          label: "标签",
        },
        {
          type: "Input",
          name: "name",
          label: "属性名",
        },
        {
          type: "Input",
          name: "effect",
          label: "依赖名",
          extra: "多个使用逗号分隔",
        },
        {
          type: "CodeEditor",
          name: "visible",
          label: "是否可见",
        },
      ]}
    />
  );
};

export const FormPanel = () => {
  return (
    <ProForm
      layout="vertical"
      schema={[
        {
          type: "Input",
          name: "title",
          label: "名称",
        },
        {
          type: "RadioGroup",
          name: "column",
          label: "排版",
          props: {
            options: [
              {
                label: 1,
                value: 1,
              },
              {
                label: 2,
                value: 2,
              },
              {
                label: 3,
                value: 3,
              },
              {
                label: 4,
                value: 4,
              },
            ],
          },
        },
        {
          type: "RadioGroup",
          name: "layout",
          label: "布局",
          props: {
            options: [
              {
                label: "horizontal",
                value: "horizontal",
              },
              {
                label: "vertical",
                value: "vertical",
              },
            ],
          },
        },
      ]}
    />
  );
};
