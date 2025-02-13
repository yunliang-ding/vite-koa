import { create } from "@shined/reactive";
import { ProFormItemProps } from "@/components/pro/antd/form/type";
import { EsModuleString } from "@/components/transcoder";

export default create<{
  title?: string;
  layout?: "horizontal" | "inline" | "vertical";
  column?: 1 | 2 | 3 | 4;
  schema: ProFormItemProps[];
  selectKey?: string;
  okText?: string;
  onSubmit?: string;
  openDrawerType?: "jsCode" | "jsonSchema";
  stateCode: EsModuleString;
  functions?: { system: boolean; functionName: string; functionCode: string }[];
  functionsOptions: { label: string; value: string }[];
  variablesOptions: { label: string; value: string }[];
  variablesModal: {
    open: boolean;
    value?: string;
    onChange?(v: string): void;
  };
  bindVariables: any;
}>({
  title: "默认标题",
  okText: "提交",
  layout: "vertical",
  column: 3,
  schema: [],
  stateCode: `export const store = create({

  });

  /** 组件渲染完成 */
  export const init = async () => {
    console.log("组件渲染完成的生命周期");
    await new Promise((res) => setTimeout(res, 1000));
    store.mutate.title = "异步渲染标题";
    store.mutate.options = [
      {
        label: "异步查询数据",
        value: 1,
      },
    ];
  };
  
  /** 组件卸载 */
  export const destroy = async () => {
    console.log("组件卸载生命周期");
  };
`,
  variablesModal: {
    open: false,
    value: "",
    onChange: () => null,
  },
  bindVariables: {},
  functionsOptions: [],
  variablesOptions: [],
});
