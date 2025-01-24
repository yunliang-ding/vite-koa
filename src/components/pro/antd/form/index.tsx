import { Form } from "antd";
import { useEffect, useState } from "react";
import { ProFormItemProps, ProFormProps } from "./type";
import { getComponent } from "./widget";

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
  if (typeof visible === "function") {
    if (visible(formInstance) !== true) {
      return null;
    }
  }
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
  onValuesChange,
  ...rest
}: ProFormProps) => {
  const [collectedEffects] = useState({}); // 依赖收集
  const [form] = Form.useForm();
  console.log(collectedEffects);
  return (
    <Form
      form={form}
      onValuesChange={(v, vs) => {
        onValuesChange?.(v, vs);
      }}
      {...rest}
    >
      {schema.map((item: ProFormItemProps) => {
        return (
          <Item
            {...item}
            key={item.name}
            formInstance={form}
            collectedEffects={collectedEffects}
          />
        );
      })}
    </Form>
  );
};
