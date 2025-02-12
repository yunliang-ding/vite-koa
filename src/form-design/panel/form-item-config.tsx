import ProForm from "@/components/pro/antd/form";
import { useEffect, useState } from "react";
import BindVariables from "./bind-variables";

export default ({
  widget = {},
  initialValues,
  onValuesChange,
}: {
  widget: any;
  initialValues: Object;
  onValuesChange: (v: Object, vs: Object, refresh?: boolean) => void;
}) => {
  const [reload, setRefresh] = useState(Math.random());
  useEffect(() => {
    setRefresh(Math.random());
  }, [initialValues]);
  return (
    <ProForm
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      widget={widget}
      key={reload}
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
          type: "CodeEditor",
          name: "visible",
          label: "是否展示",
        },
      ].map((i) => {
        return {
          ...i,
          itemRender:
            ["name"].includes(i.name) || ["CodeEditor"].includes(i.type)
              ? undefined
              : BindVariables(i.name, (v: any) => onValuesChange(v, {}, true)),
        };
      })}
    />
  );
};
