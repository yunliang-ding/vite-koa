import { Select } from "antd";
import store from "../store";

export default (props: any) => {
  return (
    <Select
      {...props}
      placeholder="请选择变量"
      allowClear
      options={store.mutate.variablesOptions}
    />
  );
};