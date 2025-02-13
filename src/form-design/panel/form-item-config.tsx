import ProForm from "@/components/pro/antd/form";
import { useEffect, useState } from "react";
import { notAllowBindVariables } from ".";
import bindVariables from "./bind-variables";

export default ({
  widget = {},
  initialValues,
  onValuesChange,
  selectKey,
}: {
  widget: any;
  initialValues: Object;
  selectKey?: string;
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
          type: "SelectVariables",
          name: "rules",
          label: "绑定rules校验规则",
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
          label: "设置联动",
          extra: "多个字段用,分隔",
        },
        {
          type: "CodeEditor",
          name: "visible",
          label: "是否展示",
          props: {
            style: {
              height: 120,
            },
          },
        },
        {
          type: "CodeEditor",
          name: "itemRender",
          label: "自定义渲染",
          props: {
            style: {
              height: 120,
            },
          },
        },
      ].map((i) => {
        return {
          ...i,
          itemRender:
            ["name"].includes(i.name) || notAllowBindVariables(i.type)
              ? undefined
              : bindVariables([selectKey, i.name].join(",")),
        };
      })}
    />
  );
};
