import { Form, FormInstance } from "antd";
import { useEffect, useState } from "react";
import { ProFormItemProps, ProFormProps } from "./type";
import { getWidget } from "./widget";
import "antd/dist/antd.css";

export const Item = ({
  type,
  visible,
  span,
  effect,
  props,
  form,
  collectedEffects,
  ...rest
}: ProFormItemProps) => {
  /** 是否展示 */
  const [reload, setReload] = useState(Math.random());
  useEffect(() => {
    /** 收集依赖 */
    effect?.forEach?.((i: string) => {
      if (collectedEffects[i] === undefined) {
        collectedEffects[i] = [
          {
            [rest.name]: {
              /** 重新加载 */
              reload() {
                setReload(Math.random());
              },
            },
          },
        ];
      } else {
        collectedEffects[i].push({
          [rest.name]: {
            /** 重新加载 */
            reload() {
              setReload(Math.random());
            },
          },
        });
      }
    });
  }, []);
  if (typeof visible === "function") {
    /** 绑定fullName到this，为了在 FormList 中联动需要 */
    if (
      visible.call({ fullName: rest.fullName }, form as FormInstance) !== true
    ) {
      return null;
    }
  }
  const Component = getWidget(type);
  if (type === "FormList") {
    return (
      <Component
        {...{ ...rest, ...props }}
        key={reload}
        form={form}
        collectedEffects={collectedEffects}
      />
    );
  }
  return (
    <Form.Item {...rest} key={reload}>
      <Component {...props} form={form} />
    </Form.Item>
  );
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
        console.log("collectedEffects =>", collectedEffects, name.toString());
        collectedEffects[name.toString()]?.forEach((item: any) => {
          Object.keys(item).forEach((key) => {
            item[key].reload(); // reload
            form.setFieldsValue({
              [key]: undefined, // clean
            });
          });
        });
      }}
      {...rest}
    >
      {schema.map((item: ProFormItemProps) => {
        return (
          <Item
            {...item}
            key={item.name}
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
        );
      })}
    </Form>
  );
};
