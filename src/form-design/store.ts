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
  storeCode: string;
  functions?: { system: boolean; functionName: string; functionCode: string }[];
  getFunctionsOptions(): { label: string; value: string }[];
  getVariablesOptions(): { label: string; value: string }[];
}>({
  title: "默认标题",
  okText: "提交",
  layout: "vertical",
  column: 3,
  schema: [],
  storeCode: `export default {
  // 定义选项
  options: [],
  // 初始化会调用该方法
  async init(){
    await new Promise(res => setTimeout(res, 1000));
    this.options = [{
      label: "选项1",
      value: 1
    }]
  },
  // 接口提交
  async onSubmit(){
    try {
      await axios.post('/user/add', {
        ...values
      });
      Antd.message.success('已提交！');
    } catch (error) {
      console.log(error)
    }
  }
}`,
  getFunctionsOptions() {
    const res = excutecoder(this.storeCode);
    console.log(res);
    return Object.keys(res)
      .filter((key) => key !== "init" && typeof res[key] === "function")
      .map((i) => ({
        label: i,
        value: `{{${i}}}`,
      }));
  },
  getVariablesOptions() {
    const res = excutecoder(this.storeCode);
    return Object.keys(res)
      .filter((key) => typeof res[key] !== "function")
      .map((i) => ({
        label: i,
        value: `{{${i}}}`,
      }));
  },
});
