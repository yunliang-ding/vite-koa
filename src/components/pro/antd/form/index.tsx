import { Col, Form, FormInstance, Row } from "antd";
import { useEffect, useState } from "react";
import { ProFormItemProps, ProFormProps } from "./type";
import { getWidget } from "./widget";
import { cloneDeep } from "../../../shared";

export const Item = ({
  type,
  visible,
  span,
  effect,
  props,
  form,
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
  const Component = getWidget(type);
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
  return VNode;
};

export default ({
  schema = [],
  column = 1,
  initialValues = {},
  onValuesChange,
  ...rest
}: ProFormProps) => {
  const [collectedEffects]: any = useState({}); // 依赖收集
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={initialValues}
      /** 统一处理联动的地方 */
      onFieldsChange={(field) => {
        const { name } = field[0];
        const effectField = collectedEffects[name.toString()];
        if (effectField) {
          Object.keys(effectField)?.forEach((key: any) => {
            effectField[key].reload(); // reload
            effectField[key].clean(); // clean
          });
          console.log(
            `collectedEffects 【${name.toString()}】 =>`,
            collectedEffects
          );
        }
      }}
      {...rest}
    >
      <Row gutter={10}>
        {cloneDeep(schema).map((item: ProFormItemProps) => {
          return (
            <Col key={item.name} span={24 / column}>
              <Item
                {...item}
                form={{
                  ...form,
                  // 合并下
                  getFieldsValue: () => {
                    return {
                      ...initialValues,
                      ...form?.getFieldsValue(),
                    };
                  },
                }}
                collectedEffects={collectedEffects}
              />
            </Col>
          );
        })}
      </Row>
    </Form>
  );
};
