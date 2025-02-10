export const getPureSchema = (state: any) => {
  return JSON.stringify(
    {
      type: "Form",
      title: state.title,
      layout: state.layout,
      selectKey: state.selectKey,
      column: state.column,
      schema: state.schema,
      okText: state.okText,
      onSubmit: state.onSubmit,
      jsCode: state.jsCode,
    },
    null,
    2
  );
};