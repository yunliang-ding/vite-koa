import ProForm from "../../../components/pro/antd/form";
import ProTable from "../../../components/pro/antd/table";

export default (code: string) => {
  try {
    const { type, ...rest } = new Function(
      `return ${code.replace("export default", "")}`
    )();
    if (type === "Form") {
      return <ProForm {...rest} />;
    }
    if (type === "Table") {
      return <ProTable  {...rest} />;
    }
    return null;
  } catch (error) {
    return <pre style={{ color: "red" }}>{String(error)}</pre>;
  }
};
