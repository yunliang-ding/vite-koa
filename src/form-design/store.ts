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
  stateCode: `export default create({});`,
  variablesModal: {
    open: false,
    value: "",
    onChange: () => null,
  },
  bindVariables: {},
  functionsOptions: [],
  variablesOptions: [],
});
