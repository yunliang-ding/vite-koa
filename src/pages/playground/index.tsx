import React from "react";
import { createStore } from "resy";
import Monaco from "../../monaco";
// import sourceCode from "./form";
import sourceCode from "./table";
import transcoder, { getEs5Code, parseSchemaToFileCode } from "./transcoder";
import globalModules from "./transcoder/modules";
import { Checkbox } from "antd";
import "./index.less";

const source = sourceCode;

const store = createStore<{
  activeTab: string;
  source: string;
  dependencies: string[];
}>({
  activeTab: "1",
  source,
  dependencies: [],
});

/** 错误捕捉 */
class ErrorBoundaryComponent extends React.Component {
  props = {
    children: null,
  };
  state = {
    hasError: false,
    error: "",
  };
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: "" } as any;
  }
  static getDerivedStateFromError() {
    // 更新state，以便下一次渲染可以显示回退UI
    return { hasError: true };
  }
  componentDidCatch(error: Error): void {
    this.setState({
      error,
    });
    console.log(error);
  }
  render() {
    if (this.state.hasError) {
      return <pre style={{ color: "red" }}>{String(this.state.error)}</pre>;
    }
    return this.props.children;
  }
}

export default () => {
  const { source, dependencies, activeTab } = store.useStore();
  const Component: any = transcoder(source, dependencies);
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
              <span className={"label"}>渲染结果</span>
            </div>
            <div
              className={activeTab === "2" ? "file-selected" : "file"}
              onClick={() => {
                store.activeTab = "2";
              }}
            >
              <i className="file-icon typescript-lang-file-icon" />
              <span className={"label"}>复制代码</span>
            </div>
            <div
              className={activeTab === "3" ? "file-selected" : "file"}
              onClick={() => {
                store.activeTab = "3";
              }}
            >
              <i className="file-icon javascript-lang-file-icon" />
              <span className={"label"}>编译预览</span>
            </div>
          </div>
        </div>
        <div
          className="body"
          style={{ padding: 10, display: activeTab === "1" ? "block" : "none" }}
        >
          <ErrorBoundaryComponent>{Component}</ErrorBoundaryComponent>
        </div>
        <div
          className="body"
          style={{ display: activeTab === "2" ? "block" : "none" }}
        >
          <Monaco value={fileCode} />
        </div>
        <div
          className="body"
          style={{ display: activeTab === "3" ? "block" : "none" }}
        >
          <Monaco value={es5Code} />
        </div>
      </div>
    </div>
  );
};
