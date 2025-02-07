import { Checkbox } from "antd";
import store from "../store";
import globalModules from "@/transcoder/modules";

export default () => {
  const { dependencies } = store.useSnapshot();
  return (
    <div className="dep-sider">
      <Checkbox.Group
        value={dependencies}
        onChange={(v) => {
          store.mutate.dependencies = v as string[];
        }}
        options={Object.keys(globalModules).map((key: string) => {
          return {
            label: key,
            value: key,
          };
        })}
      />
    </div>
  );
};
