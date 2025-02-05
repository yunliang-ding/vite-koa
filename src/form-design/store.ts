import { createStore } from "resy";
import { ProFormItemProps } from "../components/pro/antd/form/type";
import { uuid } from "../util";

export default createStore<{
  title?: "";
  layout?: "horizontal" | "inline" | "vertical";
  column?: 1 | 2 | 3 | 4;
  api?: "";
  apiMethod?: "";
  schema: ProFormItemProps[];
  selectedSchema?: any;
}>({
  layout: "vertical",
  column: 3,
  schema: [
    {
      key: uuid(),
      type: "Input",
      label: "输入框",
      name: "input"
    },
    {
      key: uuid(),
      type: "Select",
      label: "选择框",
      name: "select"
    },
  ],
});
