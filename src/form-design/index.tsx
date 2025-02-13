import { FormDesignProps } from "./type";
import { encrypt, excutecoder } from "@/components/transcoder";
import Bar from "./bar";
import Sider from "./sider";
import Canvas from "./canvas";
import Panel from "./panel";
import { useEffect } from "react";
import store from "./store";
import "./index.less";

export default ({ code, stateCode }: FormDesignProps) => {
  useEffect(() => {
    if (code) {
      try {
        Object.assign(store.mutate, JSON.parse(code.replaceAll("\n", "")));
      } catch (error) {
        console.log(error);
      }
    }
    if (stateCode) {
      store.mutate.stateCode = stateCode;
      try {
        const esModule = excutecoder(stateCode);
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
    }
  }, [code]);
  return (
    <div className="form-design">
      <Bar />
      <Sider />
      <Canvas />
      <Panel />
    </div>
  );
};
