import ProForm from "@/components/pro/antd/form";
import ProTable from "@/components/pro/antd/table";
import globalModules from "./modules";

/** 加前后缀函数 */
export const encrypt = (str: string) => {
  return `{#__#${str}#__#}`;
};
/** 解前后缀函数 */
export const decrypt = (str: string, quotation = true) => {
  if (quotation) {
    return str
      ?.replaceAll('"{#__#', "")
      .replaceAll('#__#}"', "")
      .replaceAll("\\n", "")
      .replaceAll("\\", "");
  }
  return str
    ?.replaceAll("{#__#", "")
    .replaceAll("#__#}", "")
    .replaceAll("\\n", "")
    .replaceAll("\\", "");
};
/** 获取编译结果 */
export const getEs5Code = (code: string, dependencies: string[]) => {
  const parameter = ["exports", ...dependencies].join(", ");
  const result = `((${parameter}) => {
    ${
      window.Babel.transform(code, {
        presets: ["es2015", "react", "typescript"],
        filename: "main.tsx",
      }).code
    }
})(${parameter})`;
  return result;
};
/** 执行代码 */
export const excutecoder = (code: string, dependencies: string[]): any => {
  const exports: { default?: {} } = {};
  // 形参
  const parameter = ["exports", ...dependencies].join(", ");
  // 实参
  const argument = [
    exports,
    ...dependencies.map((name: string) => globalModules[name].module),
  ];
  new Function(parameter, getEs5Code(code, dependencies))(...argument);
  return exports.default;
};
/** 生成业务代码 */
export const parseSchemaToFileCode = (code: string, dependencies: string[]) => {
  try {
    const { type } = excutecoder(code, dependencies);
    const imports: any = [];
    dependencies.forEach((name: string) => {
      imports.push(globalModules[name].imports);
    });
    if (type === "Table") {
      return `${imports.join(";")}
import LowCodeTable from "xxx/pro/antd/table";

export default () => {
  return <LowCodeTable {...${code.replace("export default ", "")}} />
}`;
    }
    if (type === "Form") {
      return `${imports.join(";")}
import LowCodeForm from "xxx/pro/antd/form";

export default () => {
  return <LowCodeForm {...${code.replace("export default ", "")}} />
}`;
    }
    return "parse Error";
  } catch (error) {
    return String(error);
  }
};
/** 渲染结果 */
export default ({
  code = "",
  dependencies = [],
}: {
  code: string;
  dependencies: any;
}): React.ReactElement => {
  try {
    const { type, ...rest } = excutecoder(code, dependencies);
    if (type === "Form") {
      return <ProForm {...rest} />;
    }
    if (type === "Table") {
      return <ProTable {...rest} />;
    }
    return <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>渲染异常，找不到类型 {type}</pre>;
  } catch (error) {
    console.log(error);
    return <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>{String(error)}</pre>;
  }
};
