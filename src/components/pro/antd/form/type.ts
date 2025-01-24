import { FormInstance, FormItemProps, FormProps } from "antd";

export interface ProFormItemProps extends FormItemProps {
  /** 表单项类型 */
  type: string;
  /** key */
  key?: string;
  /** 占据的格子数 */
  span?: 2 | 3 | "fill";
  /** 依赖渲染 */
  effect?: string[],
  /** 是否展示 */
  visible?: (form: FormInstance) => boolean;
  /** 表单项属性 */
  props?: {
    [key: string]: any;
  };
  formInstance?: FormInstance
  collectedEffects?: any; // 收集依赖
}

export interface ProFormProps extends FormProps {
  /** 数据模型 */
  schema: ProFormItemProps[];
  /** 布局等份 */
  column?: 1 | 2 | 3 | 4;
}
