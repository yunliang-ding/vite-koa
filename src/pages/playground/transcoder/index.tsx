import ProForm from "../../../components/pro/antd/form";
import ProTable from "../../../components/pro/antd/table";
import globalModules from "./modules";

export default (code: string, dependencies: any) => {
  try {
    const { type, ...rest } = new Function(
      `return (${dependencies.toString()}) => (${code.replace("export default", "")})`
    )()(...dependencies.map((name: string) => globalModules[name]));
    if (type === "Form") {
      return <ProForm {...rest} />;
    }
    if (type === "Table") {
      return <ProTable {...rest} />;
    }
    return null;
  } catch (error) {
    console.log(error);
    return <pre style={{ color: "red" }}>{String(error)}</pre>;
  }
};
