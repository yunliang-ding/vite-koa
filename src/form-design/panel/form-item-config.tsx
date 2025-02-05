import ProForm from "../../components/pro/antd/form";

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
      schema={[
        {
          type: "Input",
          name: "label",
          label: "标签",
        },
        {
          type: "Input",
          name: "name",
          label: "属性名",
        },
        {
          type: "Switch",
          name: "required",
          label: "是否必填",
          valuePropName: "checked",
        },
        {
          type: "Input",
          name: "extra",
          label: "额外说明",
        },
        {
          type: "Input",
          name: "tooltip",
          label: "悬浮提示",
        },
        {
          type: "Input",
          name: "effect",
          label: "依赖名",
          extra: "多个使用逗号分隔",
        },
        {
          type: "CodeEditor",
          name: "visible",
          label: "是否可见",
        },
      ]}
    />
  );
};
