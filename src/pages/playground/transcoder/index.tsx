import ProForm from "../../../components/pro/antd/form";
import ProTable from "../../../components/pro/antd/table";
import globalModules from "./modules";

/** 获取编译结果 */
export const getEs5Code = (code: string, dependencies: string[]) => {
  const parameter = ["exports", ...dependencies].join(", ");
  return `((${parameter}) => {
    ${
      window.Babel.transform(code, {
        presets: ["es2015", "react", "typescript"],
        filename: "main.tsx",
      }).code
    }
})(${parameter})`;
};

/** 执行代码 */
export const excuteCode = (code: string, dependencies: string[]): any => {
  const exports: { default?: {} } = {};
  const parameter = ["exports", ...dependencies].join(", ");
  const argument = [
    exports,
    ...dependencies.map((name: string) => globalModules[name]),
  ];
  new Function(parameter, getEs5Code(code, dependencies))(...argument);
  return exports.default;
};

/** 一键复制模块代码 */
export const parseSchemaToFileCode = (code: string, dependencies: string[]) => {
  return code;
};

/** 渲染结果 */
export default (code: string, dependencies: any) => {
  try {
    const { type, ...rest } = excuteCode(code, dependencies);
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
