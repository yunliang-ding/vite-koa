import { TableProps } from "antd";

export interface TableListProps extends Omit<TableProps<{}>, "columns"> {
  schema: {
    type: string;
    label: string;
    name: string;
    required?: boolean;
    props: any;
  }[];
  maxCount?: number;
  leastOne?: boolean;
  defaultAddValue?: any
  value?: any;
  onChange?: any
  widget?: any;
  drag?: boolean;
  disabledDelete?: Function
}
