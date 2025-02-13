import { FormDesignProps } from "./type";
import { encrypt, excutecoder } from "@/components/transcoder";
import Bar from "./bar";
import Sider from "./sider";
import Canvas from "./canvas";
import Panel from "./panel";
import { useEffect } from "react";
import store from "./store";
import "./index.less";

export default (props: FormDesignProps) => {
  useEffect(() => {
    try {
      Object.assign(store.mutate, props);
      try {
        const esModule = excutecoder(store.mutate.stateCode);
        store.mutate.variablesOptions = Object.keys(esModule.store.mutate).map(
          (i) => ({
            label: i,
            value: encrypt(`store.snap.${i}`),
          })
        );
        store.mutate.functionsOptions = Object.keys(esModule)
          .filter((key) => !["init", "destroy", "store"].includes(key))
          .map((i) => ({
            label: i,
            value: encrypt(`store.${i}`),
          }));
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="form-design">
      <Bar />
      <Sider />
      <Canvas />
      <Panel />
    </div>
  );
};
