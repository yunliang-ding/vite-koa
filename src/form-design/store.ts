import { createStore } from "resy";
import { ProFormItemProps } from "../components/pro/antd/form/type";

export default createStore<{
  title?: string;
  layout?: "horizontal" | "inline" | "vertical";
  column?: 1 | 2 | 3 | 4;
  api: string;
  schema: ProFormItemProps[];
  selectedSchema?: any;
}>({
  title: "默认标题",
  layout: "vertical",
  column: 3,
  api: "/user/add",
  schema: [],
});
