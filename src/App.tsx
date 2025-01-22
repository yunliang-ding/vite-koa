import { createStore } from "resy";
import Monaco from "./monaco";
import { useEffect } from "react";
// import publishModal from "./template/publish/modal";
// import transcoder from "./transcoder/publish/modal";

import publishTable from "./template/publish/table";
import transcoder from "./transcoder/publish/table";

const source = publishTable;

const store = createStore<{
  source: string;
  target: string;
}>({
  source,
  target: ""
});

export default () => {
  const { source, target } = store.useStore();
  useEffect(() => {
    (async () => {
      store.target = await transcoder(source);
    })()
  }, [source])
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
      <Monaco value={target} />
    </div>
  );
};
