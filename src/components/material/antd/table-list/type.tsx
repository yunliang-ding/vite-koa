import { TableProps } from "antd";

export interface TableListProps extends Omit<TableProps<{}>, "columns"> {
  schema: {
    type: string;
    label: string;
    name: string;
    required?: boolean;
  }[];
  maxCount?: number;
  leastOne?: boolean;
  defaultAddValue?: any
  value?: any;
  onChange?: any
}
