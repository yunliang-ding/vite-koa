import { create } from "@shined/reactive";
import Monaco from "../../monaco";
import Transcoder, {
  getEs5Code,
  parseSchemaToFileCode,
} from "@/components/transcoder";
import globalModules from "@/components/transcoder/modules";
import { Checkbox } from "antd";
import ErrorBoundary from "../../error-boundary";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "./index.less";

const store = create<{
  leftActiveTab: string;
  rightActiveTab: string;
  code: string;
  stateCode: string;
  require: string[];
}>({
  leftActiveTab: "1",
  rightActiveTab: "1",
  code: "",
  stateCode: "",
  require: Object.keys(globalModules),
});

export default () => {
  let es5Code = "";
  let fileCode = "";
  const [params] = useSearchParams();
  useMemo(() => {
    store.mutate.code = (params.get("code") as string) || "";
    store.mutate.stateCode = (params.get("stateCode") as string) || "";
  }, [params.get("code")]);
  const { code, stateCode, require, rightActiveTab, leftActiveTab } =
    store.useSnapshot();
  try {
    es5Code = getEs5Code(code, require, stateCode ? { store: {} } : {});
    fileCode = parseSchemaToFileCode(code, require, stateCode);
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
          value={require}
          onChange={(v) => {
            store.mutate.require = v as string[];
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
              className={leftActiveTab === "1" ? "file-selected" : "file"}
              onClick={() => {
                store.mutate.leftActiveTab = "1";
              }}
            >
              <i className="file-icon javascript-lang-file-icon" />
              <span className={"label"}>schema.js</span>
            </div>
            {store.mutate.stateCode && (
              <div
                className={leftActiveTab === "2" ? "file-selected" : "file"}
                onClick={() => {
                  store.mutate.leftActiveTab = "2";
                }}
              >
                <i className="file-icon javascript-lang-file-icon" />
                <span className={"label"}>store.js</span>
              </div>
            )}
          </div>
        </div>
        <div
          className="body"
          style={{ display: leftActiveTab === "1" ? "block" : "none" }}
        >
          <Monaco
            value={code}
            onChange={async (v: string) => {
              store.mutate.code = v;
            }}
          />
        </div>
        <div
          className="body"
          style={{ display: leftActiveTab === "2" ? "block" : "none" }}
        >
          <Monaco
            value={stateCode}
            onChange={async (v: string) => {
              store.mutate.stateCode = v;
            }}
          />
        </div>
      </div>
      <div className="preview" key={require.toString()}>
        <div className="header">
          <div className="tabs">
            <div
              className={rightActiveTab === "1" ? "file-selected" : "file"}
              onClick={() => {
                store.mutate.rightActiveTab = "1";
              }}
            >
              <i className="file-icon javascriptreact-lang-file-icon" />
              <span className={"label"}>Preview</span>
            </div>
            <div
              className={rightActiveTab === "2" ? "file-selected" : "file"}
              onClick={() => {
                store.mutate.rightActiveTab = "2";
              }}
            >
              <i className="file-icon typescript-lang-file-icon" />
              <span className={"label"}>业务代码</span>
            </div>
            <div
              className={rightActiveTab === "3" ? "file-selected" : "file"}
              onClick={() => {
                store.mutate.rightActiveTab = "3";
              }}
            >
              <i className="file-icon javascript-lang-file-icon" />
              <span className={"label"}>babel 编译预览</span>
            </div>
          </div>
        </div>
        <div
          className="body"
          style={{
            padding: 10,
            display: rightActiveTab === "1" ? "block" : "none",
          }}
        >
          <ErrorBoundary>
            <Transcoder code={code} stateCode={stateCode} key={[code, stateCode].join()} />
          </ErrorBoundary>
        </div>
        <div
          className="body"
          style={{ display: rightActiveTab === "2" ? "block" : "none" }}
        >
          <Monaco value={fileCode} readOnly />
        </div>
        <div
          className="body"
          style={{ display: rightActiveTab === "3" ? "block" : "none" }}
        >
          <Monaco value={es5Code} readOnly />
        </div>
      </div>
    </div>
  );
};
