import { cloneDeep } from "../../../shared";
import { ProFormItemProps } from "./type";

/** 扩展模型 */
export const enhanceSchema = (schema: ProFormItemProps[]) => {
  return cloneDeep(schema).map((item: ProFormItemProps) => {
    if (typeof item.type === "string") {
      if (["Input", "InputNumber", "TextArea"].includes(item.type)) {
        if (item.props === undefined) {
          item.props = {
            placeholder: "请输入",
          };
        } else {
          item.props.placeholder = item.props.placeholder || "请输入";
        }
      }
      if (["Select", "DatePicker", "TreeSelect"].includes(item.type)) {
        if (item.props === undefined) {
          item.props = {
            placeholder: "请选择",
          };
        } else {
          item.props.placeholder = item.props.placeholder || "请选择";
        }
      }
    }
    // 处理子表单
    if (item.type === "FormList") {
      if (item.props?.schema) {
        item.props.schema = enhanceSchema(item.props?.schema);
      }
    }
    return {
      ...item,
    };
  });
};
