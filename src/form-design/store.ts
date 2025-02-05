import { createStore } from "resy";
import { ProFormItemProps } from "@/components/pro/antd/form/type";
import globalModules from "@/transcoder/modules";
import { encrypt } from "@/transcoder";

export default createStore<{
  dependencies: string[];
  title?: string;
  layout?: "horizontal" | "inline" | "vertical";
  column?: 1 | 2 | 3 | 4;
  schema: ProFormItemProps[];
  selectedSchema?: any;
  onSubmit?: string;
}>({
  dependencies: Object.keys(globalModules),
  title: "默认标题",
  layout: "vertical",
  column: 3,
  schema: [],
  onSubmit: encrypt(`async (values) => {
  await axios.post('/user/add', {
    ...values
  });
  Antd.message.success('已提交！');
}`),
});
