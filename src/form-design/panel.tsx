import store from "./store";

export default () => {
  const { selectedSchema } = store.useStore()
  return (
    <div className="panel">
      panel
    </div>
  );
};
