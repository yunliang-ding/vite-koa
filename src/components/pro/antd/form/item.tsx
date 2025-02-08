import { Col, Form, FormInstance } from "antd";
import { useEffect, useState } from "react";
import { ProFormItemProps } from "./type";
import { getWidget } from "./widget";

export default ({
  type,
  visible,
  span,
  effect,
  props,
  form,
  widget = {},
  collectedEffects,
  itemRender,
  ...rest
}: ProFormItemProps) => {
  /** 是否展示 */
  const [reload, setReload] = useState(Math.random());
  useEffect(() => {
    /** 提供的API */
    const API = {
      /** 重新加载 */
      reload() {
        setReload(Math.random());
      },
      // 清空值
      clean() {
        // 清空 formList逻辑
        if (Array.isArray(rest.fullname)) {
          const values = form?.getFieldsValue();
          const [name, index, subName] = rest.fullname;
          values[name][index][subName] = undefined; // clean
          form?.setFieldsValue?.({
            name: values[name],
          });
        } else {
          form?.setFieldsValue?.({
            [rest.name]: undefined, // clean
          });
        }
      },
    };
    /** 收集依赖 */
    effect?.forEach?.((i: string) => {
      const names = rest.fullname || rest.name;
      if (collectedEffects[i] === undefined) {
        collectedEffects[i] = {
          [names]: API,
        };
      } else {
        collectedEffects[i][names] = {
          ...API,
        };
      }
    });
  }, []);
  if (typeof visible === "function") {
    /** 绑定fullname到this，为了在 FormList 中联动需要 */
    if (
      visible.call({ fullname: rest.fullname }, form as FormInstance) !== true
    ) {
      return null;
    }
  }
  const Component = getWidget(type, widget);
  let VNode = (
    <Form.Item {...rest} key={reload}>
      <Component {...props} form={form} />
    </Form.Item>
  );
  /** 渲染子表单 */
  if (type === "FormList") {
    VNode = (
      <Component
        {...{ ...rest, ...props }}
        key={reload}
        form={form}
        collectedEffects={collectedEffects}
      />
    );
  }
  /** 扩展渲染 */
  if (typeof itemRender === "function") {
    return itemRender(VNode, form);
  }
  return <Col span={span}>{VNode}</Col>;
};
