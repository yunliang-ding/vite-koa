import { CSSProperties, ReactNode } from 'react';

export interface DragProps {
  /** 配置项 */
  items?: {
    key: number | string;
    content: ReactNode;
    [key: string]: any;
  }[];
  /** 容器样式 */
  style?: CSSProperties;
  /** 改变的钩子 */
  onChange?: Function;
  /** 默认选中的key */
  defaultKey?: string | number;
  /** 选中钩子 */
  onSelected?: Function;
  /** 是否允许接受外部组件 */
  accept?: boolean;
  /** 是否可以选择 */
  selected?: boolean;
  children?: ReactNode;
  dragId?: string;
}