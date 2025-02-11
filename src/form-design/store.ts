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
  storeCode: `export default create({
  // 定义选项
  options: [],
  // 初始化会调用该方法
  async init() {
    await new Promise((res) => setTimeout(res, 1000));
    this.options = [
      {
        label: "异步查询数据",
        value: 1,
      },
    ];
    console.log("初始化会调用该方法");
  },
  // 接口提交
  async onSubmit(values) {
    try {
      await axios.post("/user/add", {
        ...values,
        // date: moment(values.date).format("YYYY-MM-DD"),
      });
      Antd.message.success("已提交！");
    } catch (error) {
      console.log(error);
    }
  },
});`,
  getFunctionsOptions() {
    const res = excutecoder(this.storeCode);
    return Object.keys(res.mutate)
      .filter((key) => key !== "init" && typeof res.mutate[key] === "function")
      .map((i) => ({
        label: i,
        value: `{{${i}}}`,
      }));
  },
  getVariablesOptions() {
    const res = excutecoder(this.storeCode);
    return Object.keys(res.mutate)
      .filter((key) => typeof res.mutate[key] !== "function")
      .map((i) => ({
        label: i,
        value: `{{${i}}}`,
      }));
  },
});
