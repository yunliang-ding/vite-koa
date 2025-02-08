import { ProFormItemProps } from "@/components/pro/antd/form/type";

export default [
  {
    type: "Input",
    label: "属性名",
    name: "dataIndex",
  },
  {
    type: "InputNumber",
    label: "宽度",
    name: "width",
  },
  {
    type: "Input",
    label: "提示文案",
    name: "tooltipt",
  },
  {
    type: "Switch",
    label: "是否千分位",
    name: "useThousandth",
    valuePropName: "checked",
  },
  {
    type: "InputNumber",
    label: "千分位小数保留位",
    name: "minimumFractionDigits",
    props: {
      min: 0,
      max: 6,
    },
    effect: ["useThousandth"],
    visible({ getFieldValue }) {
      return getFieldValue("useThousandth") === true;
    },
  },
  {
    type: "Switch",
    label: "设置维度",
    name: "dimension",
    valuePropName: "checked",
  },
  {
    type: "Input",
    label: "维度key",
    name: "dimensionName",
    extra: "aggWithxxx",
    effect: ["dimension"],
    visible({ getFieldValue }) {
      return getFieldValue("dimension") === true;
    },
  },
  {
    type: "Switch",
    label: "维度是否默认选中",
    name: "dimensionDefaultChecked",
    effect: ["dimension"],
    visible({ getFieldValue }) {
      return getFieldValue("dimension") === true;
    },
  },
  {
    type: "CodeEditor",
    label: "自定义渲染",
    name: "render",
    span: 24,
    props: {
      style: {
        width: "100%",
        height: 300,
      },
    },
  },
] as ProFormItemProps[];
