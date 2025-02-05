import ProForm from "@/components/pro/antd/form";
import CodeEditor from "@/code-editor";

export default ({
  initialValues,
  onValuesChange,
}: {
  initialValues: Object;
  onValuesChange: (v: Object, vs: Object) => void;
}) => {
  return (
    <ProForm
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      widget={{
        CodeEditor
      }}
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
          type: "CodeEditor",
          name: "onSubmit",
          label: "提交事件",
        },
      ]}
    />
  );
};
