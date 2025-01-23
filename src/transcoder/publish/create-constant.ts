import { parserVariables, prettierFormat } from "../util";

export default async (view: any = {}) => {
  try {
    const { columns } = new Function(`return ${view.replace("export default", "")}`)();
    const deps: any = [];
    const dimensionArr: any = [];
    const aggParamsArr: any = [];
    const columnArr: any = [];
    columns.forEach((item: any) => {
      if(item.isThousand){
        deps.push('numberAndPercentFormatter');
        return columnArr.push(`{
          ${parserVariables({
            ...item,
            isThousand: undefined,
          })},
          render: (v) => numberAndPercentFormatter(v, 0),
        }`)
      }
      if(item.isRemark){
        deps.push('textWrapper');
        return columnArr.push(`{
          ${parserVariables({
            ...item,
            isRemark: undefined,
          })},
          render: (v) => textWrapper(v),
        }`)
      }
      if(item.dimension){
        dimensionArr.push(`{
          ${parserVariables({
            label: item.title,
            value: item.dataIndex,
            defaultChecked: item.dimension.defaultChecked,
          })}
        }`);
        aggParamsArr.push(`case "${item.dataIndex}":aggParams.${item.dimension.name} = true;break;`)
        return columnArr.push(`{
          ${parserVariables({
            ...item,
            dimension: undefined,
          })}
        }`)
      }
      columnArr.push(`{
        ${parserVariables(item)}
      }`)
    })
    const str = `import { ${[...new Set(deps)].join(',')} } from "@shein-component/frontend-low-code/shared";
  
export const columns = [
  ${columnArr.join(",")}
];

export const deminsionsOptions = [
  ${dimensionArr.join(",")}
];

export const exchangeAggParams = (dimensions: string[]) => {
  const aggParams: any = {};
  dimensions.forEach((item: string) => {
    switch (item) {
      ${aggParamsArr.join(';')}
      default:
        break;
    }
  });
  return aggParams;
};
`;
    return {
      fileName: "constant.tsx",
      code: await prettierFormat(str),
    };
  } catch (error) {
    return {
      fileName: "constant.tsx",
      code: String(error),
      error: true,
    };
  }
};
