import { Modal } from "antd";
import store from "../store";

export default () => {
  const state = store.useSnapshot();
  return (
    <Modal
      title="列属性设置"
      width={1000}
      bodyStyle={{
        height: 800
      }}
      open={state.openCellModal}
      onCancel={() => {
        store.mutate.openCellModal = false;
      }}
    >
      xxx
    </Modal>
  );
};
