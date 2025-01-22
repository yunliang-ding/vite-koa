import { createStore } from "resy";
import Monaco from "./monaco";
import { useEffect } from "react";
import sourceCode from "./template/publish/schema";
import transcoder from "./transcoder/publish";

const source = sourceCode;

const store = createStore<{
  activeTab?: number;
  source: string;
  target: {
    fileName: string;
    code: string;
  }[];
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
  const { source, target, activeTab } = store.useStore();
  useEffect(() => {
    (async () => {
      store.target = await transcoder(source);
    })();
  }, [source]);
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Monaco
        value={source}
        onChange={async (v: string) => {
          store.source = v;
        }}
      />
      <div className="preview show-file-icons">
        <div className="header">
          {target.map((item: any, index: number) => {
            return (
              <div
                className={
                  index === (activeTab || 0) ? "file-selected" : "file"
                }
                key={item.fileName}
                onClick={() => {
                  store.activeTab = index;
                }}
              >
                <i className="file-icon typescriptreact-lang-file-icon" />
                {item.fileName}
              </div>
            );
          })}
        </div>
        <div className="body">
          {target.map((item: any, index: number) => {
            return (
              <Monaco
                value={item.code}
                key={item.fileName}
                readOnly
                style={{
                  display: index === (activeTab || 0) ? "block" : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
