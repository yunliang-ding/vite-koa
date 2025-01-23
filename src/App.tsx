import { createStore } from "resy";
import Monaco from "./monaco";
import { useEffect } from "react";
import sourceCode from "./template/publish";
import transcoder from "./transcoder/publish";

interface FileProps {
  fileName: string;
  code: string;
}
const source = sourceCode;

const store = createStore<{
  leftActiveTab?: number;
  rightActiveTab?: number;
  source: any;
  target: FileProps[];
}>({
  source,
  target: [
    {
      fileName: "view.tsx",
      code: "",
    },
  ],
});

export default () => {
  const { source, target, leftActiveTab, rightActiveTab } = store.useStore();
  useEffect(() => {
    (async () => {
      store.target = await transcoder(source);
    })();
  }, [source]);
  return (
    <div
      className="show-file-icons"
      style={{
        display: "flex",
      }}
    >
      <div className="code-space">
        <div className="header">
          {Object.keys(source).map((key: any, index: number) => {
            return (
              <div
                className={
                  index === (leftActiveTab || 0) ? "file-selected" : "file"
                }
                key={key}
                onClick={() => {
                  store.leftActiveTab = index;
                }}
              >
                {key === "style" ? (
                  <i className="file-icon less-lang-file-icon" />
                ) : (
                  <i className="file-icon typescriptreact-lang-file-icon" />
                )}
                {key}
              </div>
            );
          })}
        </div>
        <div className="body">
          {Object.keys(source).map((key: any, index: number) => {
            return (
              <Monaco
                language={key === "style" ? "less" : "javascript"}
                value={source[key]}
                style={{
                  display: index === (leftActiveTab || 0) ? "block" : "none",
                }}
                onChange={async (v: string) => {
                  store.source = {
                    ...source,
                    [key]: v,
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="preview">
        <div className="header">
          {target.map((item: any, index: number) => {
            return (
              <div
                className={
                  index === (rightActiveTab || 0) ? "file-selected" : "file"
                }
                key={item.fileName}
                onClick={() => {
                  store.rightActiveTab = index;
                }}
              >
                <i className="file-icon typescriptreact-lang-file-icon" />
                <span className={item.error ? "error" : "label"}>{item.fileName}</span>
              </div>
            );
          })}
        </div>
        <div className="body">
          {target.map((item: any, index: number) => {
            return (
              <Monaco
                value={item.code}
                language={item.fileName === "style.less" ? "less" : "javascript"}
                key={item.fileName}
                readOnly
                style={{
                  display: index === (rightActiveTab || 0) ? "block" : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
