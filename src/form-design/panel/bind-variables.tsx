import { FormInstance } from "antd";
import store from "../store";
import Icon from "./icon";

const hasBind = (value: string | number) =>
  String(value)?.startsWith("<%") && String(value)?.endsWith("%>");

export default (name: string, onValuesChange: Function) => (dom: React.ReactNode, formInstance?: FormInstance) => {
  const value = formInstance?.getFieldsValue()[name] || "";
  const isBind = hasBind(value);
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: 9,
          pointerEvents: isBind ? "none" : "auto",
          opacity: isBind ? 0.5 : 1,
        }}
      >
        {dom}
      </div>
      <div
        style={{ flex: 1, cursor: "pointer" }}
        onClick={() => {
          store.mutate.variablesModal = {
            open: true,
            value: isBind ? value : undefined,
            onChange(v: string) {
              onValuesChange({
                [name]: v
              });
            },
          };
        }}
      >
        <Icon color={isBind ? "#1890ff" : "#aaa"} />
      </div>
    </div>
  ) as React.ReactElement;
};
