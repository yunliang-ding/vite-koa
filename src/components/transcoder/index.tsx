import { create } from "@shined/reactive";
import { useEffect } from "react";
import ProForm from "../pro/antd/form";
import ProTable from "../pro/antd/table";
import globalModules from "./modules";

const prefix = "#_#";

/** 添加前后缀标记 */
export const encrypt = (str: string) => {
  return `${prefix}${str}${prefix}`;
};
/** 移除前后缀标记 */
export const decrypt = (str: string, quotation = true) => {
  const code = str.replaceAll("\\n", "").replaceAll("\\", "");
  if (quotation) {
    return code?.replaceAll(`"${prefix}`, "").replaceAll(`${prefix}"`, "");
  }
  return code?.replaceAll(prefix, "");
};
/** 获取编译结果 */
export const getEs5Code = (code: string, require: string[], otherRequire = {}) => {
  const parameter = ["exports", ...require, ...Object.keys(otherRequire)].join(", ");
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
export const excutecoder = (code: string, require: any = {}): any => {
  // 内部的模块
  const innerRequire = Object.keys(globalModules);
  // 等待导出的对象
  const exports: { default?: {} } = {};
  // 组装形参
  const parameter = [
    "exports",
    ...innerRequire.map((name: string) => name),
    ...Object.keys(require),
  ].join(", ");
  // 组装实参
  const argument = [
    exports,
    ...innerRequire.map((name: string) => globalModules[name].module),
    ...Object.keys(require).map((key: string) => require[key]),
  ];
  new Function(
    parameter,
    getEs5Code(code, [
      ...innerRequire.map((name: string) => name),
      ...Object.keys(require),
    ])
  )(...argument);
  return exports.default;
};

/** 生成业务代码 */
export const parseSchemaToFileCode = (code: string, require: string[], stateCode = "") => {
  try {
    let store = create({ init: () => {} });
    if (stateCode) {
      // 开始解析 store
      store = excutecoder(stateCode);
    }
    const { type } = excutecoder(code, { store });
    const imports: any = [];
    require.forEach((name: string) => {
      imports.push(globalModules[name].imports);
    });
    if (type === "Table") {
      return `${imports.join(";")}
import LowCodeTable from "xxx/pro/antd/table";

${stateCode !== "" ? `const store = ${stateCode.replace("export default ", "")}` : ""}

export default () => {
  return <LowCodeTable {...${code.replace("export default ", "")}} />
}`;
    }
    if (type === "Form") {
      return `${imports.join(";")}
import LowCodeForm from "xxx/pro/antd/form";

${stateCode !== "" ? `const store = ${stateCode.replace("export default ", "")}` : ""}

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
  stateCode = "",
}: {
  code: string;
  stateCode?: string;
}): React.ReactElement => {
  try {
    let store = create({ init: () => {} });
    if (stateCode) {
      // 开始解析 store
      store = excutecoder(stateCode);
    }
    const { type, ...rest } = excutecoder(code, { store }); // 开始解析模型
    store.useSnapshot?.(); // 获取快照
    useEffect(() => {
      store.mutate.init?.(); // 执行init
    }, []);
    if (type === "Form") {
      return <ProForm {...rest} />;
    }
    if (type === "Table") {
      return <ProTable {...rest} />;
    }
    return (
      <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
        渲染异常，找不到类型 {type}
      </pre>
    );
  } catch (error) {
    console.log(error);
    return (
      <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
        {String(error)}
      </pre>
    );
  }
};
