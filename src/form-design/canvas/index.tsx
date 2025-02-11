import { Tabs } from "antd";
import store from "../store";
import Monaco from "@/monaco";
import EditPanel from "./edit";
import { getPureStringModule } from "../util";

export default () => {
  const state = store.useSnapshot();
  const source = getPureStringModule(state);
  return (
    <div className="canvas">
      <Tabs
        defaultActiveKey="1"
        size="small"
        style={{
          background: "#fff",
          width: "100%", 
          height: "100%",
        }}
        items={[
          {
            label: "编辑",
            key: "1",
            children: <EditPanel />,
          },
          {
            label: "标准模型",
            key: "3",
            children: (
              <Monaco
                value={`export default ${source}`}
                readOnly
                theme="vs"
                style={{ height: "calc(100vh - 70px)" }}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
