import { prettierFormat } from "../util";

export const parserVariables = (variables: any = {}) => {
  return Object.keys(variables)
    .map((key) => {
      if (["object"].includes(typeof variables[key])) {
        return `${key}: ${JSON.stringify(variables[key])}`;
      }
      if (["string"].includes(typeof variables[key])) {
        return `${key}: "${variables[key]}"`;
      }
      return `${key}: ${variables[key]}`;
    })
    .join(",");
};

export const parseAssignment = (assignment: any = {}) => {
  return Object.keys(assignment)
    .map((key) => {
      return `this.${key} = ${assignment[key]}`;
    })
    .join(";");
};

export const parserFunction = (functions: any = []) => {
  return functions
    .map((item: any) => {
      return `
      async ${item.name}(){
        try{
          ${item.openSpin ? "this.loading = true" : ""}
          const res = await sendPost({
            url: "${item.api}",
            params: ${item.params ? `(${item.params.toString()})()` : "{}"},
          });
          ${item.openSpin ? "this.loading = false" : ""}
          ${item.assignment ? parseAssignment(item.assignment) : ""}
        } catch(error){
          console.log(error);
          ${item.openSpin ? "this.loading = false" : ""}
        }
      }
    `;
    })
    .join(",");
};

export default async (code: string) => {
  try {
    const data = new Function(`return ${code.replace("export default", "")}`)();
    const str = `{
      ${parserVariables(data.variables)},${parserFunction(data.functions)}
    }`;
    console.log(str);
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
