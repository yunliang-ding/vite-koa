import { cloneDeep } from "@/components/shared";
import { decrypt, encrypt } from "@/components/transcoder";

export function parseTemplate(template: string) {
  if (typeof template === "string") {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      return encrypt(`store.mutate.${key}`)
    });
  }
  return template
}


export const getOriginStringModule = (state: any) => {
  return JSON.stringify(
    {
      type: "Form",
      title: state.title,
      layout: state.layout,
      selectKey: state.selectKey,
      column: state.column,
      schema: state.schema,
      okText: state.okText,
      onSubmit: state.onSubmit,
    },
    null,
    2
  );
};

// 得到一份干净的数据模型
export const getPureStringModule = (state: any) => {
  const schema = cloneDeep(state.schema); // clone 一份
  const str = JSON.stringify(
    {
      type: "Form",
      title: state.title,
      layout: state.layout,
      selectKey: state.selectKey,
      column: state.column,
      schema: schema.map((item: any) => {
        delete item.key;
        return {
          ...item,
        }
      }),
      okText: state.okText,
      onSubmit: state.onSubmit,
    },
    null,
    2
  );
  return decrypt(parseTemplate(str));
};