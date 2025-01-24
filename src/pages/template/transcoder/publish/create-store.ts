import { parserFunction, parserVariables, prettierFormat } from "../util";

export default async (code: string) => {
  try {
    const data = new Function(`return ${code.replace("export default", "")}`)();
    const str = `{
      ${parserVariables(data.variables)},${parserFunction(data.functions)}
    }`;
    const store = `import createStore from "resy";

export default createStore(${str});`;
    return {
      fileName: "store.tsx",
      code: await prettierFormat(store),
    };
  } catch (error) {
    return {
      fileName: "store.tsx",
      code: String(error),
      error: true,
    };
  }
};
