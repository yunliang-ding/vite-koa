import { ProFormItemProps } from "@/components/pro/antd/form/type";
import { FormItemProps } from "antd";

export interface FormListProps extends FormItemProps {
  column: 1 | 2 | 3 | 4;
  name: string;
  title?: string;
  maxCount?: number;
  leastOne?: boolean;
  schema: ProFormItemProps[];
  defaultAddValue?: any
}