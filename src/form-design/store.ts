import { create } from "@shined/reactive";
import { ProFormItemProps } from "@/components/pro/antd/form/type";

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
      functionCode: `async (values) => {
  await new Promise(res => setTimeout(res, 1000));
  this.options = [{
    label: "选项1",
    value: 1
  }]
}`,
    },
    {
      system: true,
      functionName: "onSubmit",
      functionCode: `async (values) => {
  try {
    await axios.post('/user/add', {
      ...values
    });
    Antd.message.success('已提交！');
  } catch (error) {
    console.log(error)
  }
}`,
    },
  ],
});
