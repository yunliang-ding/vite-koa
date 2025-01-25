import Form from "../../../components/material/antd/form";

export default (code: string) => {
  const { type, ...rest } = new Function(
    `return ${code.replace("export default", "")}`
  )();
  if (type === "Form") {
    return <Form {...rest} />;
  }
  return null;
};
