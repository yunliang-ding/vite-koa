import store from "../store";
import Designer from "./design";
import { getEsModuleString } from "@/components/transcoder";

export default () => {
  const snap = store.useSnapshot();
  const source = getEsModuleString({
    type: "Form",
    title: snap.title,
    layout: snap.layout,
    column: snap.column,
    schema: snap.schema,
    okText: snap.okText,
    onSubmit: snap.onSubmit,
    bindVariables: snap.bindVariables,
  });
  return (
    <div className="canvas">
      <Designer source={source} />
    </div>
  );
};
