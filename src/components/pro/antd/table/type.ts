import { ButtonProps, TableProps, TableColumnProps } from "antd";
import { MutableRefObject } from "react";
import { ProFormProps } from "../form/type";

export interface ProTableColumnProps extends TableColumnProps<{}> {
  /** 枚举 */
  enums?: any;
  /** 日期转换 */
  dateFormat?: string;
  /** 维度信息 */
  dimension?: {
    name: string,
    defaultChecked: boolean,
  },
  /** 千分位 */
  useThousandth?: {
    minimumFractionDigits: number,
    maximumFractionDigits: number,
  } | boolean;
}

export interface ToolProps extends Omit<ButtonProps, "onClick"> {
  label?: string;
  /** 扩展参数 */
  onClick?: (api: { refresh?: Function; search?: Function }) => void;
}

export interface MenuProps extends ButtonProps {
  /** 标签名 */
  label?: string;
  /** 二次确认 */
  confirm?: string;
}

export interface ProTableRef{
  refresh?: Function;
  search?: Function;
  dataSource?: any;
  pagination?: any;
  params?: any;
  loading?: boolean;
};

export interface ProTableProps extends Omit<TableProps<{}>, ""> {
  /** 列信息 */
  columns: ProTableColumnProps[];
  /** 查询信息配置 */
  search?: ProFormProps;
  /** 统一数据请求 */
  request: (params: any, filter: any, sort: any) => Promise<{
    success: boolean;
    total: number;
    data: any[];
  }>;
  /** table 实例 */
  tableRef?: MutableRefObject<ProTableRef | undefined>;
  /** 工具配置 */
  tools?: ToolProps[];
  /** 操作列配置 */
  rowOperations?: {
    width: string | number;
    menus: (api: {
      record: any;
      refresh?: Function;
      search?: Function;
      index: number;
    }) => MenuProps[];
  };
  /** 额外的参数 */
  params?: any;
  /** 是否开启刷新 */
  useRefresh?: boolean;
  /** 是否开启列过滤 */
  useFilter?: boolean;
  /** 默认不展示的列 */
  defaultFilterIds?: string[];
  /** 序号 */
  autoNo?: boolean;
  setLoading?: Function;
}
