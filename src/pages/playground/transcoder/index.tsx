import Form from "../../../components/pro/antd/form";

export default (code: string) => {
  const { type, ...rest } = new Function(
    `return ${code.replace("export default", "")}`
  )();
  if (type === "Form") {
    return <Form {...rest} />;
  }
  return null;
};
