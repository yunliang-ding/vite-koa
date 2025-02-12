import store from "../store";
import Icon from "./icon";

export default (name: string) => (dom: React.ReactNode) => {
  const snap = store.useSnapshot();
  const value = snap.bindVariables?.[name];
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
          pointerEvents: value ? "none" : "auto",
          opacity: value ? 0.5 : 1,
        }}
      >
        {dom}
      </div>
      <div
        style={{ flex: 1, cursor: "pointer" }}
        onClick={() => {
          store.mutate.variablesModal = {
            open: true,
            value,
            onChange(v: string) {
              store.mutate.bindVariables[name] = v;
            },
          };
        }}
      >
        <Icon color={value ? "#1890ff" : "#aaa"} />
      </div>
    </div>
  ) as React.ReactElement;
};
