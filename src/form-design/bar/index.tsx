import Monaco from "@/monaco";
import { EllipsisOutlined, JavaScriptOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { getOriginStringModule } from "../util";
import CodeEditor from "@/monaco/code-editor";
import store from "../store";

export default () => {
  const state = store.useSnapshot();
  const source = getOriginStringModule(state);
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
          width={500}
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
          {/* <Variables /> */}
          <CodeEditor
            useEncrypt={false}
            value={state.storeCode}
            style={{ width: "100%", height: "100%" }}
            onChange={(v: string) => {
              store.mutate.storeCode = v;
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
