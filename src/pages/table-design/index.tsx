import Form from "@/components/pro/antd/form";

export default () => {
  return (
    <Form
      initialValues={{
        options: [
          {
            label: "选项1",
            value: "1",
          },
          {
            label: "选项2",
            value: "2",
          },
        ],
      }}
      onValuesChange={(v) => {
        console.log(v);
      }}
      schema={[
        {
          type: "TableList",
          name: "options",
          props: {
            defaultAddValue: {
              label: "新选项"
            },
            schema: [
              {
                type: "Input",
                name: "label",
                label: "属性名",
              },
              {
                type: "Input",
                name: "value",
                label: "属性值",
              },
            ],
          },
        },
      ]}
    />
  );
};
