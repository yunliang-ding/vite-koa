import Form from "@/components/pro/antd/form";
import { Modal } from "antd";
import store from "../store";
import cellSchema from "./schema/cell";
import CodeEditor from "@/monaco/code-editor";

export default () => {
  const state = store.useSnapshot();
  const column = store.mutate.columns[state.openCellModal.index] || {};
  return (
    <Modal
      open
      title={`${column.title} 设置`}
      width={1000}
      bodyStyle={{
        height: "60vh",
      }}
      onCancel={() => {
        store.mutate.openCellModal.open = false;
      }}
    >
      <Form
        schema={cellSchema}
        layout="vertical"
        initialValues={{
          ...column,
        }}
        column={3}
        widget={{ CodeEditor }}
      />
    </Modal>
  );
};
