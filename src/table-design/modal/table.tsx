import { Modal } from "antd";
import store from "../store";

export default () => {
  return (
    <Modal
      open
      title="表格设置"
      width={1000}
      bodyStyle={{
        height: "60vh",
      }}
      onCancel={() => {
        store.mutate.openTableModal = false;
      }}
    >
      xxx
    </Modal>
  );
};
