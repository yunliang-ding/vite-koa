import { FormInstance, FormItemProps, FormProps } from "antd";
import { ReactNode } from "react";

export interface ProFormItemProps extends FormItemProps {
  /** 表单项类型 */
  type: string | (() => ReactNode);
  /** key */
  key?: any;
  /** 占据的格子数 */
  span?: number;
  /** 依赖渲染 */
  effect?: string[];
  /** 是否展示 */
  visible?: (form: FormInstance) => boolean;
  /** 自定义渲染逻辑 */
  itemRender?: (dom: React.ReactNode, form?: FormInstance) => React.ReactElement;
  /** 表单项属性 */
  props?: {
    [key: string]: any;
    /** 子表单模型 */
    schema?: ProFormItemProps[];
  };
  form?: FormInstance;
  collectedEffects?: any; // 收集依赖
  [key: string]: any;
}

export interface ProFormProps extends FormProps {
  /** 数据模型 */
  schema: ProFormItemProps[];
  /** 布局等份 */
  column?: 1 | 2 | 3 | 4;
  /** 标题 */
  title?: string;
  /** 提交 */
  onSubmit?(vs: Object): void;
  /** 按钮文案 */
  okText?: string;
  /** 自定义类型 */
  widget?: Object;
}
