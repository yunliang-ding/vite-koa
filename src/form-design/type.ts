import { ProFormItemProps } from "@/components/pro/antd/form/type";
import { EsModuleString } from "@/components/transcoder";

export interface FormDesignProps{
  title?: string;
  okText?: string;
  layout?: string;
  column?: number;
  stateCode?: EsModuleString,
  schema: ProFormItemProps[];
  bindVariables?: {},
}