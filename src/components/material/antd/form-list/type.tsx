import { FormItemProps } from "antd";
import { ProFormItemProps } from "../form/type";

export interface FormListProps extends FormItemProps {
  column: 1 | 2 | 3 | 4;
  name: string;
  title?: string;
  maxCount?: number;
  leastOne?: boolean;
  schema: ProFormItemProps[];
}