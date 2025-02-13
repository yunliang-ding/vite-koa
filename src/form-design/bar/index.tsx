import Monaco from "@/monaco";
import {
  encrypt,
  EsModuleString,
  getEsModuleString,
} from "@/components/transcoder";
import { EllipsisOutlined, JavaScriptOutlined } from "@ant-design/icons";
import { Drawer, Tabs } from "antd";
import CodeEditor from "@/monaco/code-editor";
import store from "../store";

export default () => {
  const snap = store.useSnapshot();
  const module = {
    type: "Form",
    title: snap.title,
    layout: snap.layout,
    selectKey: snap.selectKey,
    column: snap.column,
    schema: snap.schema,
    okText: snap.okText,
    onSubmit: snap.onSubmit,
    bindVariables: snap.bindVariables,
  };
  const source = JSON.stringify(
    {
      ...module,
      stateCode: snap.stateCode,
    },
    null,
    2
  );
  const esModuleString = getEsModuleString(module);
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
          const code = getEsModuleString({
            type: "Form",
            title: snap.title,
            layout: snap.layout,
            selectKey: snap.selectKey,
            column: snap.column,
            schema: snap.schema,
            okText: snap.okText,
            onSubmit: snap.onSubmit,
            bindVariables: snap.bindVariables,
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
      {snap.openDrawerType === "jsCode" && (
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
            value={snap.stateCode}
            style={{ width: "100%", height: "100%" }}
            onChange={(v: EsModuleString, esModule: any) => {
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
      {snap.openDrawerType === "jsonSchema" && (
        <Drawer
          open
          width={"calc(100% - 48px)"}
          getContainer={false}
          style={{
            top: 54,
          }}
          headerStyle={{
            display: "none"
          }}
          bodyStyle={{
            padding: 0,
          }}
          onClose={() => {
            store.mutate.openDrawerType = undefined;
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "JSONSchema",
                children: (
                  <Monaco
                    style={{ height: "calc(100vh - 100px)" }}
                    value={source}
                    readOnly
                    language="json"
                    theme="vs"
                  />
                ),
              },
              {
                key: "2",
                label: "EsModuleString",
                children: (
                  <Monaco
                    style={{ height: "calc(100vh - 100px)" }}
                    value={esModuleString}
                    readOnly
                    theme="vs"
                  />
                ),
              },
            ]}
          />
        </Drawer>
      )}
    </div>
  );
};
