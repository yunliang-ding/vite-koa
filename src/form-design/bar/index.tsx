import Monaco from "@/monaco";
import { encrypt, getPureStringModule } from "@/components/transcoder";
import { EllipsisOutlined, JavaScriptOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import CodeEditor from "@/monaco/code-editor";
import store from "../store";

export default () => {
  const state = store.useSnapshot();
  const source = JSON.stringify(
    {
      type: "Form",
      title: state.title,
      layout: state.layout,
      selectKey: state.selectKey,
      column: state.column,
      schema: state.schema,
      okText: state.okText,
      onSubmit: state.onSubmit,
      bindVariables: state.bindVariables,
      stateCode: state.stateCode,
    },
    null,
    2
  );
  return (
    <div className="bar-sider">
      <div
        className="bar-sider-item"
        onClick={() => {
          store.mutate.openDrawerType = "jsCode";
        }}
      >
        <JavaScriptOutlined />
      </div>
      <div
        className="bar-sider-item"
        onClick={() => {
          const code = getPureStringModule({
            type: "Form",
            title: state.title,
            layout: state.layout,
            selectKey: state.selectKey,
            column: state.column,
            schema: state.schema,
            okText: state.okText,
            onSubmit: state.onSubmit,
            bindVariables: state.bindVariables,
          });
          window.open(
            `/#/preview?code=${encodeURIComponent(code)}&stateCode=${encodeURIComponent(store.mutate.stateCode)}`
          );
        }}
      >
        预览
      </div>
      <div
        className="bar-sider-item bar-sider-item-bottom"
        onClick={() => {
          store.mutate.openDrawerType = "jsonSchema";
        }}
      >
        <EllipsisOutlined style={{ fontSize: 30 }} />
      </div>
      {state.openDrawerType === "jsCode" && (
        <Drawer
          open
          title="源码面板"
          width={600}
          placement="left"
          getContainer={false}
          style={{
            top: 54,
            left: 48,
          }}
          bodyStyle={{
            padding: 0,
          }}
          onClose={() => {
            store.mutate.openDrawerType = undefined;
          }}
        >
          <CodeEditor
            useEncrypt={false}
            value={state.stateCode}
            style={{ width: "100%", height: "100%" }}
            onChange={(v: string, esModule: any) => {
              console.log("esModule", esModule);
              store.mutate.stateCode = v;
              store.mutate.variablesOptions = Object.keys(
                esModule.store.mutate
              ).map((i) => ({
                label: i,
                value: encrypt(`store.snap.${i}`),
              }));
              store.mutate.functionsOptions = Object.keys(esModule)
                .filter((key) => !["init", "destroy", "store"].includes(key))
                .map((i) => ({
                  label: i,
                  value: encrypt(`store.${i}`),
                }));
            }}
          />
        </Drawer>
      )}
      {state.openDrawerType === "jsonSchema" && (
        <Drawer
          open
          title="Schema"
          width={"calc(100% - 48px)"}
          getContainer={false}
          style={{
            top: 54,
          }}
          bodyStyle={{
            padding: 0,
          }}
          onClose={() => {
            store.mutate.openDrawerType = undefined;
          }}
        >
          <Monaco value={source} readOnly language="json" theme="vs" />
        </Drawer>
      )}
    </div>
  );
};
