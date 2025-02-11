import { create } from "@shined/reactive";
import { ProFormItemProps } from "@/components/pro/antd/form/type";
import { excutecoder } from "@/components/transcoder";

export default create<{
  title?: string;
  layout?: "horizontal" | "inline" | "vertical";
  column?: 1 | 2 | 3 | 4;
  schema: ProFormItemProps[];
  selectKey?: string;
  okText?: string;
  onSubmit?: string;
  openDrawerType?: "jsCode" | "jsonSchema";
  stateCode: string;
  functions?: { system: boolean; functionName: string; functionCode: string }[];
  getFunctionsOptions(): { label: string; value: string }[];
  getVariablesOptions(): { label: string; value: string }[];
}>({
  title: "默认标题",
  okText: "提交",
  layout: "vertical",
  column: 3,
  schema: [],
  stateCode: `export default create({});`,
  getFunctionsOptions() {
    try {
      const res = excutecoder(this.stateCode);
      return Object.keys(res)
        .filter((key) => key !== "store")
        .map((i) => ({
          label: i,
          value: `{{${i}}}`,
        }));
    } catch (error) {
      console.log(error);
    }
    return [];
  },
  getVariablesOptions() {
    try {
      const res = excutecoder(this.stateCode);
      return Object.keys(res.store.mutate).map((i) => ({
        label: i,
        value: `{{${i}}}`,
      }));
    } catch (error) {
      console.log(error);
    }
    return [];
  },
});
