// 转换处理
import { isEmpty, cloneDeep, NumberFormat } from '../../../shared';
import { ProTableColumnProps } from './type';
import moment from 'moment';

export const transformColumns = (
  columns: ProTableColumnProps[],
  emptyNode = '-',
) => {
  const newColumns = cloneDeep(columns)?.filter((i: any) => i.visible !== false); // 避免污染、过滤下
  if (Array.isArray(columns)) {
    return newColumns.map((column: ProTableColumnProps) => {
      const defineRender: any = column.render; // 获取用户定义的render
      // 扩展 render
      column.render = (value, record, index) => {
        let vNode: any =
          typeof defineRender === 'function'
            ? defineRender(value, record, index)
            : value; // 定义了则先执行render
        // 枚举
        if (column.enums) {
          vNode = column.enums[value];
        }
        // 日期格式化
        if (column.dateFormat && vNode) {
          vNode = moment(vNode).format(column.dateFormat);
        }
        // 千分位处理
        if (column.useThousandth) {
          vNode = NumberFormat(
            vNode,
            typeof column.useThousandth === 'boolean'
              ? undefined
              : column.useThousandth,
            emptyNode,
          );
        }
        // 处理空数据展示
        if (emptyNode) {
          vNode = isEmpty(vNode) ? emptyNode : vNode;
        }
        return vNode;
      };
      return column;
    });
  }
  return [];
};
