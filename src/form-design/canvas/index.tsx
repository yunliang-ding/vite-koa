import { Tabs } from "antd";
import store from "../store";
import Monaco from "@/monaco";
import EditPanel from "./edit";
import ErrorBoundary from "@/error-boundary";
import Transcoder, { excutecoder } from "@/components/transcoder";
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
            label: "预览",
            key: "2",
            children: (
              <ErrorBoundary>
                <Transcoder
                  code={`export default ${source}`}
                  require={{
                    store: excutecoder(store.mutate.storeCode),
                  }}
                />
              </ErrorBoundary>
            ),
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
