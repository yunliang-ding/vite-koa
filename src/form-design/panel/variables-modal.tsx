import { Modal, Select } from "antd";
import store from "../store";

export default () => {
  const snap = store.useSnapshot();
  return (
    <Modal
      title="变量绑定"
      open
      footer={false}
      onCancel={() => {
        store.mutate.variablesModal.open = false;
      }}
      bodyStyle={{
        height: 200,
      }}
    >
      <Select
        style={{ width: "100%" }}
        placeholder="请选择要绑定的变量"
        allowClear
        defaultValue={snap.variablesModal.value}
        onChange={snap.variablesModal.onChange}
        options={snap.getVariablesOptions()}
      />
    </Modal>
  );
};
