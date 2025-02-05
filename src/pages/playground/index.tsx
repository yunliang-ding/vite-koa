import { createStore } from "resy";
import Monaco from "../../monaco";
import sourceCode from "./form";
// import sourceCode from "./table";
import Transcoder, { getEs5Code, parseSchemaToFileCode } from "@/transcoder";
import globalModules from "@/transcoder/modules";
import { Checkbox } from "antd";
import ErrorBoundary from "../../error-boundary";
import "./index.less";

const source = sourceCode;

const store = createStore<{
  activeTab: string;
  source: string;
  dependencies: string[];
}>({
  activeTab: "1",
  source,
  dependencies: Object.keys(globalModules),
});

export default () => {
  const { source, dependencies, activeTab } = store.useStore();
  let es5Code = "";
  let fileCode = "";
  try {
    es5Code = getEs5Code(source, dependencies);
    fileCode = parseSchemaToFileCode(source, dependencies);
  } catch (error) {
    console.log(error);
    es5Code = String(error);
    fileCode = String(error);
  }
  return (
    <div
      className="show-file-icons"
      style={{
        display: "flex",
      }}
    >
      <div className="dep-sider">
        <Checkbox.Group
          value={dependencies}
          onChange={(v) => {
            store.dependencies = v as string[];
          }}
          options={Object.keys(globalModules).map((key: string) => {
            return {
              label: key,
              value: key,
            };
          })}
        />
      </div>
      <div className="code-space">
        <div className="header">
          <div className="tabs">
            <div
              className={activeTab === "1" ? "file-selected" : "file"}
              onClick={() => {
                store.activeTab = "1";
              }}
            >
              <i className="file-icon javascript-lang-file-icon" />
              <span className={"label"}>配置模型</span>
            </div>
          </div>
        </div>
        <div className="body">
          <Monaco
            value={source}
            onChange={async (v: string) => {
              store.source = v;
            }}
          />
        </div>
      </div>
      <div className="preview" key={dependencies.toString()}>
        <div className="header">
          <div className="tabs">
            <div
              className={activeTab === "1" ? "file-selected" : "file"}
              onClick={() => {
                store.activeTab = "1";
              }}
            >
              <i className="file-icon javascriptreact-lang-file-icon" />
              <span className={"label"}>Preview</span>
            </div>
            <div
              className={activeTab === "2" ? "file-selected" : "file"}
              onClick={() => {
                store.activeTab = "2";
              }}
            >
              <i className="file-icon typescript-lang-file-icon" />
              <span className={"label"}>业务代码</span>
            </div>
            <div
              className={activeTab === "3" ? "file-selected" : "file"}
              onClick={() => {
                store.activeTab = "3";
              }}
            >
              <i className="file-icon javascript-lang-file-icon" />
              <span className={"label"}>babel 编译预览</span>
            </div>
          </div>
        </div>
        <div
          className="body"
          style={{ padding: 10, display: activeTab === "1" ? "block" : "none" }}
        >
          <ErrorBoundary>
            <Transcoder code={source} dependencies={dependencies} />
          </ErrorBoundary>
        </div>
        <div
          className="body"
          style={{ display: activeTab === "2" ? "block" : "none" }}
        >
          <Monaco value={fileCode} readOnly />
        </div>
        <div
          className="body"
          style={{ display: activeTab === "3" ? "block" : "none" }}
        >
          <Monaco value={es5Code} readOnly />
        </div>
      </div>
    </div>
  );
};
