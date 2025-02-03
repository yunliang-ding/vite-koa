import React from "react";
import { createStore } from "resy";
import Monaco from "../../monaco";
// import sourceCode from "./form";
import sourceCode from "./table";
import transcoder from "./transcoder";
import globalModules from "./transcoder/modules";
import { Checkbox } from "antd";
import "./index.less";

const source = sourceCode;

const store = createStore<{
  source: string;
  dependencies: string[];
}>({
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
  const { source, dependencies } = store.useStore();
  const Component: any = transcoder(source, dependencies);
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
        <div className="body" style={{ padding: 10 }}>
          <ErrorBoundaryComponent>{Component}</ErrorBoundaryComponent>
        </div>
      </div>
    </div>
  );
};
