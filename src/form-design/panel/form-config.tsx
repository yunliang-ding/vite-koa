import ProForm from "@/components/pro/antd/form";
import { Form } from "antd";
import { useEffect } from "react";
import { notAllowBindVariables } from ".";
import BindVariables from "./bind-variables";

export default ({
  widget = {},
  initialValues,
  onValuesChange,
}: {
  widget: any;
  initialValues: Object;
  onValuesChange: (v: Object, vs: Object) => void;
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);
  return (
    <ProForm
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      widget={widget}
      schema={[
        {
          type: "Input",
          name: "title",
          label: "标题",
        },
        {
          type: "RadioGroup",
          name: "column",
          label: "排版",
          props: {
            optionType: "button",
            options: [
              {
                label: 1,
                value: 1,
              },
              {
                label: 2,
                value: 2,
              },
              {
                label: 3,
                value: 3,
              },
              {
                label: 4,
                value: 4,
              },
            ],
          },
        },
        {
          type: "RadioGroup",
          name: "layout",
          label: "布局",
          props: {
            optionType: "button",
            options: [
              {
                label: "horizontal",
                value: "horizontal",
              },
              {
                label: "vertical",
                value: "vertical",
              },
            ],
          },
        },
        {
          type: "SelectFunctions",
          name: "onSubmit",
          label: "绑定提交方法",
        },
        {
          type: "Input",
          name: "okText",
          label: "按钮文案",
        },
      ].map((i) => {
        return {
          ...i,
          itemRender: notAllowBindVariables(i.type)
            ? undefined
            : BindVariables(i.name),
        };
      })}
    />
  );
};
