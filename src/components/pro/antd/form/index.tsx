import { Card, Form, Row } from "antd";
import { useState } from "react";
import { ProFormItemProps, ProFormProps } from "./type";
import { enhanceSchema } from "./util";
import Button from "../../../material/antd/button";
import Item from "./item";
import "./index.less";

export default ({
  schema = [],
  column = 1,
  onSubmit = () => {},
  initialValues = {},
  title,
  okText = "提交",
  widget = {},
  form = Form.useForm()[0],
  ...rest
}: ProFormProps) => {
  const getFieldsValue = () => {
    return {
      ...initialValues,
      ...form?.getFieldsValue(),
    };
  }
  const [collectedEffects]: any = useState({}); // 依赖收集
  const VNode = (
    <Form
      form={form}
      initialValues={initialValues}
      /** 统一处理联动的地方 */
      onFieldsChange={(field) => {
        // console.log("collectedEffects =>", collectedEffects);
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
        {enhanceSchema(schema).map((item: ProFormItemProps) => {
          return (
            <Item
              span={24 / column}
              {...item}
              key={item.name}
              widget={widget}
              form={{
                ...form,
                getFieldsValue,
              }}
              collectedEffects={collectedEffects}
            />
          );
        })}
      </Row>
    </Form>
  );
  /** 带有标题的提交表单 */
  if (title) {
    return (
      <div className="low-code-form">
        <Card
          title={title}
          actions={
            onSubmit
              ? [
                  <Button
                    type="primary"
                    onClick={async () => {
                      const vs = await form.validateFields();
                      await onSubmit(vs);
                    }}
                  >
                    {okText}
                  </Button>,
                ]
              : undefined
          }
        >
          {VNode}
        </Card>
      </div>
    );
  }
  return <div className="low-code-form">{VNode}</div>;
};
