import { createStore } from "resy";
import Monaco from "../../monaco";
// import formCode from "./form";
import tableCode from "./table";
import transcoder from "./transcoder";
import "./index.less";

const source = tableCode;

const store = createStore<{
  source: any;
}>({
  source,
});

export default () => {
  const { source } = store.useStore();
  const Component = transcoder(source);
  return (
    <div
      className="show-file-icons"
      style={{
        display: "flex",
      }}
    >
      <div className="code-space">
        <div className="header">
          <div className="tabs">
            <div className={"file-selected"}>
              <i className="file-icon javascript-lang-file-icon" />
              配置文件
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
      <div className="preview">
        <div className="body">{Component}</div>
      </div>
    </div>
  );
};
