import ProForm from "@/components/pro/antd/form";
import material from "../material-config";
import { Empty, Tabs } from "antd";
import FormItemConfig from "./form-item-config";
import FormConfig from "./form-config";
import BindFunctions from "./bind-functions";
import BindVariables from "./bind-variables";
import CodeEditor from "@/monaco/code-editor";
import VariablesModal from "./variables-modal";
import store from "../store";

export default () => {
  const state = store.useSnapshot();
  const selectItem: any = store.mutate.schema.find(
    (i) => i.key === state.selectKey
  );
  const panelSchema = material[selectItem?.type]?.propsConfig; // 该物料对应的属性配置
  return (
    <div className="panel">
      <Tabs
        defaultActiveKey="1"
        size="small"
        items={[
          {
            label: "Form 设置",
            key: "1",
            children: (
              <FormConfig
                initialValues={state}
                widget={{
                  CodeEditor,
                  BindFunctions,
                }}
                onValuesChange={(v) => {
                  Object.assign(store.mutate, v);
                }}
              />
            ),
          },
          {
            label: "Form.Item 设置",
            key: "2",
            children: panelSchema ? (
              <FormItemConfig
                key={state.selectKey}
                initialValues={selectItem}
                selectKey={state.selectKey}
                widget={{
                  CodeEditor,
                  BindFunctions,
                }}
                onValuesChange={(v: any) => {
                  Object.assign(selectItem, v);
                  const index = store.mutate.schema.findIndex(
                    (i) => i.key === state.selectKey
                  );
                  store.mutate.schema.splice(index, 1, selectItem);
                  store.mutate.schema = [...store.mutate.schema];
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
                key={state.selectKey}
                schema={panelSchema.map((i: any) => {
                  return {
                    ...i,
                    itemRender: ["BindFunctions", "CodeEditor"].includes(i.type)
                      ? undefined
                      : BindVariables(
                          [state.selectKey, "props", i.name].join(",")
                        ),
                  };
                })}
                layout="vertical"
                initialValues={selectItem.props}
                onValuesChange={(_, vs) => {
                  Object.assign(selectItem.props, vs);
                  const index = store.mutate.schema.findIndex(
                    (i) => i.key === state.selectKey
                  );
                  store.mutate.schema.splice(index, 1, selectItem);
                  store.mutate.schema = [...store.mutate.schema];
                }}
                widget={{
                  CodeEditor,
                  BindFunctions,
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
      {state.variablesModal.open && <VariablesModal />}
    </div>
  );
};
