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
import { useState } from "react";

export default () => {
  const state = store.useSnapshot();
  const [reload, setRefresh] = useState(Math.random());
  const selectItem: any = store.mutate.schema.find(
    (i) => i.key === state.selectKey
  );
  const panelSchema = material[selectItem?.type]?.propsConfig; // 该物料对应的属性配置
  /** 元素属性改变 */
  const onFieldValuesChange = (_: any, vs: any, refresh = false) => {
    Object.assign(selectItem.props, vs);
    const index = store.mutate.schema.findIndex(
      (i) => i.key === state.selectKey
    );
    store.mutate.schema.splice(index, 1, selectItem);
    store.mutate.schema = [...store.mutate.schema];
    if(refresh){
      setRefresh(Math.random())
    }
  };
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
                  BindVariables,
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
                key={[state.selectKey, reload].join("")}
                initialValues={selectItem}
                widget={{
                  CodeEditor,
                  BindFunctions,
                }}
                onValuesChange={(v: any, __:any, refresh = false) => {
                  Object.assign(selectItem, v);
                  const index = store.mutate.schema.findIndex(
                    (i) => i.key === state.selectKey
                  );
                  store.mutate.schema.splice(index, 1, selectItem);
                  store.mutate.schema = [...store.mutate.schema];
                  if(refresh){
                    setRefresh(Math.random())
                  }
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
                key={[state.selectKey, reload].join("")}
                schema={panelSchema.map((i: any) => {
                  return {
                    ...i,
                    itemRender: ["BindFunctions", "CodeEditor"].includes(i.type)
                      ? undefined
                      : BindVariables(i.name, (v: any) => onFieldValuesChange({}, v, true)),
                  };
                })}
                layout="vertical"
                initialValues={selectItem.props}
                onValuesChange={onFieldValuesChange}
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
