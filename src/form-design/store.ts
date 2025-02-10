import { create } from "@shined/reactive";
import { ProFormItemProps } from "@/components/pro/antd/form/type";
import { encrypt } from "@/transcoder";

export default create<{
  title?: string;
  layout?: "horizontal" | "inline" | "vertical";
  column?: 1 | 2 | 3 | 4;
  schema: ProFormItemProps[];
  selectKey?: string;
  okText?: string;
  onSubmit?: string;
  openDrawerType?: "jsCode" | "jsonSchema";
  variables?: string[];
  functions: { system: boolean; functionName: string; functionCode: string }[];
  getFunctionsOptions(): { label: string; value: string }[];
}>({
  title: "默认标题",
  okText: "提交",
  layout: "vertical",
  column: 3,
  schema: [],
  functions: [
    {
      system: true,
      functionName: "init",
      functionCode: encrypt(`async (values) => {
  await new Promise(res => setTimeout(res, 1000));
  this.options = [{
    label: "选项1",
    value: 1
  }]
}`),
    },
    {
      system: true,
      functionName: "onSubmit",
      functionCode: encrypt(`async (values) => {
  try {
    await axios.post('/user/add', {
      ...values
    });
    Antd.message.success('已提交！');
  } catch (error) {
    console.log(error)
  }
}`),
    },
  ],
  getFunctionsOptions() {
    return this.functions
      .filter((i) => i.functionName !== "init")
      .map((i: any) => ({
        label: i.functionName,
        value: `{{${i.functionName}}}`,
      }));
  },
});
