
import { FormDesignProps } from './type';
import Dep from './dep'
import Sider from "./sider";
import Canvas from "./canvas";
import Panel from "./panel";
import { useEffect } from 'react';
import store from './store';
import "./index.less";

export default ({ jsonSchema }: FormDesignProps) => {
  useEffect(() => {
    if(jsonSchema){
      try {
        Object.assign(store.mutate, JSON.parse((jsonSchema).replaceAll("\n", "")))
      } catch (error) {
        console.log(error)
      }
    }
  }, [jsonSchema])
  return (
    <div className="form-design">
      <Dep />
      <Sider />
      <Canvas />
      <Panel />
    </div>
  );
};
