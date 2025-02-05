import { createStore } from "resy";
import { ProFormItemProps } from "../components/pro/antd/form/type";

export default createStore<{
  title?: "";
  layout?: "horizontal" | "inline" | "vertical";
  column?: 1 | 2 | 3 | 4;
  schema: ProFormItemProps[];
  selectedSchema?: any;
  getPureSchema(): string;
}>({
  layout: "vertical",
  column: 3,
  schema: [],
  getPureSchema() {
    return `export default ${JSON.stringify(
      {
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
