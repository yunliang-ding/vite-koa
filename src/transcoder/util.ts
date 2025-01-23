import prettier from "prettier";
import typescript from "prettier/plugins/typescript";
import prettierPluginEstree from "prettier/plugins/estree";

/** 打码 */
export const encrypt = (str: string) => {
  return `{{_#${str}_#}}`;
};
/** 解码 */
export const decrypt = (str: string, quotation = true) => {
  if (quotation) {
    return str?.replaceAll('"{{_#', "{").replaceAll('_#}}"', "}");
  }
  return str?.replaceAll("{{_#", "{").replaceAll("_#}}", "}");
};
/** 模版转译 */
export const parseTemplate = (template: string, storeDep: any) => {
  if (typeof template === "string") {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      storeDep.push(key); // 收集到store
      return encrypt(key); // 批量替换
    });
  }
  return template;
};
/** 对象转字符串拼接 */
export const parserObjectToString = (obj: any = {}, storeDep: any) => {
  const str: any = [];
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .forEach((key) => {
      if (["function"].includes(typeof obj[key])) {
        str.push(`${key} = {${parseTemplate(obj[key].toString(), storeDep)}}`);
      } else if (["object"].includes(typeof obj[key])) {
        str.push(
          `${key} = {${parseTemplate(JSON.stringify(obj[key]), storeDep)}}`
        );
      } else {
        str.push(`${key} = "${parseTemplate(obj[key], storeDep)}"`);
      }
    });
  return str.join(" ");
};

export const parserVariables = (variables: any = {}) => {
  return Object.keys(variables)
    .filter((key) => variables[key] !== undefined)
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
/** prettier 格式化代码 */
export const prettierFormat = async (code: string) => {
  return prettier.format(decrypt(code), {
    parser: "typescript",
    plugins: [typescript, prettierPluginEstree],
  });
};
