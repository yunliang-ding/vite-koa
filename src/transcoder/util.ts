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
    return str?.replaceAll('"{{_#', '{').replaceAll('_#}}"', '}');
  }
  return str?.replaceAll('{{_#', '{').replaceAll('_#}}', '}');
};
/** 模版转译 */
export const parseTemplate = (template: string, storeDep: any) => {
  if (typeof template === "string") {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      storeDep.push(key); // 收集到store
      return encrypt(key); // 批量替换
    });
  }
  return template
}
/** 对象转字符串拼接 */
export const parserObjectToString = (obj: any = {}, storeDep: any) => {
  const str: any = [];
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .forEach((key) => {
      if (["function"].includes(typeof obj[key])) {
        str.push(`${key} = {${parseTemplate(obj[key].toString(), storeDep)}}`);
      } else if (["object"].includes(typeof obj[key])) {
        str.push(`${key} = {${parseTemplate(JSON.stringify(obj[key]), storeDep)}}`);
      } else {
        str.push(`${key} = "${parseTemplate(obj[key], storeDep)}"`);
      }
    });
  return str.join(" ");
};
/** prettier 格式化代码 */
export const prettierFormat = async (code: string) => {
  return prettier.format(decrypt(code), {
    parser: "typescript",
    plugins: [typescript, prettierPluginEstree],
  });
}