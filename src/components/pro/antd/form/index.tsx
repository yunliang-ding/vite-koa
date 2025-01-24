import { Form, FormInstance } from "antd";
import { useEffect, useState } from "react";
import { ProFormItemProps, ProFormProps } from "./type";
import { getComponent } from "./widget";
import 'antd/dist/antd.css';

const Item = ({
  type,
  visible,
  span,
  effect,
  props,
  formInstance,
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
        },);
      }
    });
  }, []);
  if (typeof visible === "function") {
    if (visible(formInstance as FormInstance) !== true) {
      return null;
    }
  }
  const Component = getComponent(type);
  return (
    <Form.Item {...rest} key={reload}>
      <Component {...props} />
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
      onValuesChange={(v, vs) => {
        const [name] = Object.keys(v);
        console.log("collectedEffects =>", collectedEffects);
        collectedEffects[name]?.forEach((item: any) => {
          Object.keys(item).forEach(key => {
            item[key].reload(); // reload
            form.setFieldsValue({
              [key]: undefined, // clean
            })
          })
        });
        onValuesChange?.(v, vs);
      }}
      {...rest}
    >
      {schema.map((item: ProFormItemProps) => {
        return (
          <Item
            {...item}
            key={item.name}
            formInstance={{
              ...form,
              // 合并下
              getFieldsValue: () => {
                return {
                  ...initialValues,
                  ...form?.getFieldsValue(),
                }
              }
            }}
            collectedEffects={collectedEffects}
          />
        );
      })}
    </Form>
  );
};
