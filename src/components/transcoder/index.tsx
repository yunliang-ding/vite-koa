import { useEffect, useMemo } from "react";
import globalModules from "./modules";
import TranscoderComponent from "./component";
import { create } from "@shined/reactive";
import { cloneDeep } from "../shared";

/** 添加前后缀标记 */
export const encrypt = (str: string) => {
  return `<%${str}%>`;
};

/** 移除前后缀标记 */
export const decrypt = (str: string, quotation = true) => {
  const code = str.replaceAll("\\n", "").replaceAll("\\", "");
  if (quotation) {
    return code?.replaceAll('"<%', "").replaceAll('%>"', "");
  }
  return code?.replaceAll("<%", "").replaceAll("%>", "");
};

/** 获取编译结果 */
export const getEs5Code = (
  code: string,
  require: string[],
  otherRequire = {}
) => {
  const parameter = ["exports", ...require, ...Object.keys(otherRequire)].join(
    ", "
  );
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
  return exports.default ? exports.default : exports;
};

/** 生成业务代码 */
export const parseSchemaToFileCode = (
  code: string,
  require: string[],
  stateCode = ""
) => {
  try {
    let store = { init: () => {}, snap: {}, mutate: {} };
    const { type } = excutecoder(code, { store });
    const imports: any = [];
    require.forEach((name: string) => {
      imports.push(globalModules[name].imports);
    });
    if (type === "Table") {
      return `${imports.join(";")}
import LowCodeTable from "xxx/pro/antd/table";

${stateCode !== "" ? stateCode : ""}

export default () => {
  ${
    stateCode !== ""
      ? `store.useSnapshot?.(); // 获取快照
  useEffect(() => {
    store.init?.(); // 执行init
    return () => {
      store.destory?.(); // 销毁
    }
  }, []);`
      : ""
  }  return <LowCodeTable {...${code.replace("export default ", "")}} />
}`;
    }
    if (type === "Form") {
      return `${imports.join(";\n")}
import LowCodeForm from "xxx/pro/antd/form";

${stateCode !== "" ? stateCode : ""}

export default () => {
  ${
    stateCode !== ""
      ? `store.useSnapshot?.(); // 获取快照
  useEffect(() => {
    store.init?.(); // 执行init
    return () => {
      store.destory?.(); // 销毁
    }
  }, []);`
      : ""
  }
  return <LowCodeForm {...${code.replace("export default ", "")}} />
}`;
    }
    return "parse Error";
  } catch (error) {
    return String(error);
  }
};

/** 得到标准数据模型 */
export const getPureStringModule = (state: any) => {
  const cloneSchema = cloneDeep(state.schema); // clone 一份
  const str = JSON.stringify(
    {
      ...state,
      schema: cloneSchema.map((item: any) => {
        delete item.key;
        return {
          ...item,
        };
      }),
    },
    null,
    2
  );
  return decrypt(str);
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
    const store = useMemo(() => {
      if (stateCode) {
        const { store, ...rest } = excutecoder(stateCode); // 开始解析 store
        Object.assign(store, rest); // 其他自定义的方法合并到 store
        return store;
      }
      return create({});
    }, [stateCode]);
    const snap = store.useSnapshot?.(); // 获取快照
    useEffect(() => {
      store.init?.(); // 执行init
      return () => {
        store.destory?.(); // 销毁
      };
    }, []);
    const props = excutecoder(code, {
      store: {
        ...store,
        snap,
      },
    }); // 开始解析模型
    return <TranscoderComponent {...props} />;
  } catch (error) {
    console.log(error);
    return (
      <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
        {String(error)}
      </pre>
    );
  }
};
