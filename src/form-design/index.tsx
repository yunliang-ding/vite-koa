
import { FormDesignProps } from './type';
import Bar from './bar'
import Sider from "./sider";
import Canvas from "./canvas";
import Panel from "./panel";
import { useEffect } from 'react';
import store from './store';
import "./index.less";

export default ({ code, stateCode }: FormDesignProps) => {
  useEffect(() => {
    if(code){
      try {
        Object.assign(store.mutate, JSON.parse((code).replaceAll("\n", "")))
      } catch (error) {
        console.log(error)
      }
    }
    if(stateCode){
      store.mutate.stateCode = stateCode;
    }
  }, [code])
  return (
    <div className="form-design">
      <Bar />
      <Sider />
      <Canvas />
      <Panel />
    </div>
  );
};
