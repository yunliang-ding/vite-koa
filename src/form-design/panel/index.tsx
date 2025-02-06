import ProForm from "@/components/pro/antd/form";
import material from "../material-config";
import { Empty, Tabs } from "antd";
import FormItemConfig from "./form-item-config";
import FormConfig from "./form-config";
import CodeEditor from "@/code-editor";
import store from "../store";

export default () => {
  const { selectedSchema, layout, title, column, onSubmit, okText } = store.useStore();
  const panelSchema = material[selectedSchema?.type]?.propsConfig; // 该物料对应的属性配置
  return (
    <div className="panel">
      <Tabs
        defaultActiveKey="1"
        size="small"
        style={{
          padding: "0 10px",
        }}
        items={[
          {
            label: "Form 设置",
            key: "1",
            children: (
              <FormConfig
                initialValues={{
                  layout,
                  title,
                  column,
                  okText,
                  onSubmit,
                }}
                onValuesChange={(v) => {
                  Object.assign(store, v);
                }}
              />
            ),
          },
          {
            label: "Form.Item 设置",
            key: "2",
            children: panelSchema ? (
              <FormItemConfig
                key={selectedSchema.key}
                initialValues={selectedSchema}
                onValuesChange={(v: any) => {
                  if(v.effect){
                    v.effect = v.effect.split(',')
                  }
                  Object.assign(selectedSchema, v);
                  store.schema = [...store.schema];
                }}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="请选择表单项"
              />
            ),
          },
          {
            label: "元素设置",
            key: "3",
            children: panelSchema ? (
              <ProForm
                schema={panelSchema}
                layout="vertical"
                initialValues={selectedSchema.props}
                widget={{
                  CodeEditor
                }}
                onValuesChange={(_, vs) => {
                  Object.assign(selectedSchema.props, vs);
                  store.schema = [...store.schema];
                }}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="请选择表单项"
              />
            ),
          },
        ]}
      />
    </div>
  );
};
