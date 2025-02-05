import { createStore } from "resy";
import { ProFormItemProps } from "../components/pro/antd/form/type";

export default createStore<{
  title?: string;
  layout?: "horizontal" | "inline" | "vertical";
  column?: 1 | 2 | 3 | 4;
  schema: ProFormItemProps[];
  selectedSchema?: any;
  getPureSchema(): string;
}>({
  title: "默认标题",
  layout: "vertical",
  column: 3,
  schema: [],
  getPureSchema() {
    return `export default ${JSON.stringify(
      {
        type: "Form",
        layout: this.layout,
        column: this.column,
        schema: this.schema,
      },
      null,
      2
    )}
`;
  },
});

export const pureProps = (schema = []) => {
  schema.forEach((item: any) => {
    delete item.key;
  });
  return schema;
};
