import ProForm from "../../../components/pro/antd/form";
import ProTable from "../../../components/pro/antd/table";
import globalModules from "./modules";

const excuteCode = (es5Code: string, dependencies: string[]): any => {
  const exports: { default?: {} } = {};
  const parameter = ["exports", ...dependencies].join(", ");
  const argument = [
    exports,
    ...dependencies.map((name: string) => globalModules[name]),
  ];
  // wrapper接受的参数
  const wrapperCode = `((${parameter}) => {${es5Code}})(${parameter})`;
  new Function(parameter, wrapperCode)(...argument);
  return exports.default;
};

export default (code: string, dependencies: any) => {
  try {
    const { type, ...rest } = excuteCode(
      window.Babel.transform(code, {
        presets: ["env", "react", "typescript"],
        filename: "main.tsx",
      }).code,
      dependencies
    );
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
