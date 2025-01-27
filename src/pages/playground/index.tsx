import { createStore } from "resy";
import Monaco from "../../monaco";
// import formCode from "./form";
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

export default () => {
  const { source, dependencies } = store.useStore();
  const Component = transcoder(source, dependencies);
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
        <div className="body">{Component}</div>
      </div>
    </div>
  );
};
