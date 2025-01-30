import { Button, Table } from "antd";
import { PaginationConfig } from "antd/lib/pagination";
import { useEffect, useState } from "react";
import { ProTableProps } from "./type";

export default ({
  tools,
  request = async (_, __, ___) => {
    return {
      success: true,
      total: 0,
      data: [],
    };
  },
  tableRef,
  setLoading,
  pagination,
  params = {},
  dataSource,
  rowKey = "id",
  autoNo = false,
  ...rest
}: ProTableProps) => {
  const [list, setList] = useState(dataSource);
  const [pageInfo] = useState<PaginationConfig>({
    current: 1,
    pageSize: 10,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} `,
  });
  /** 页码 */
  useEffect(() => {
    if (pagination) {
      Object.assign(pageInfo, pagination);
    }
  }, [pagination]);
  // 自增序号
  if (autoNo) {
    rest.columns.unshift({
      title: "序号",
      fixed: "left",
      dataIndex: "yld-serial-number",
      width: 80,
      render: (_: any, __: any, index: number) => {
        if (pageInfo) {
          return (
            // @ts-ignore
            (pageInfo?.current - 1) * pageInfo.pageSize + index + 1
          );
        }
        return index + 1;
      },
    });
  }
  /** 查询 */
  const query = async (extraParams = {}, filter: any = {}, sort: any = {}) => {
    setLoading?.(true);
    try {
      const { success, data, total } = await request(
        {
          pageSize: pageInfo.pageSize,
          pageNum: pageInfo.current,
          ...params,
          ...extraParams,
        },
        filter,
        sort
      );
      if (success) {
        pageInfo.total = total;
        setList(data);
      }
    } catch (error) {
      console.log("query error: ", error);
    } finally {
      setLoading?.(false);
    }
  };
  // 挂载api
  useEffect(() => {
    if (tableRef && tableRef.current) {
      tableRef.current.refresh = async (params = {}) => {
        await query(params);
      };
      tableRef.current.search = async (params = {}) => {
        await query({
          ...params,
          pageNum: 1, // 第一页
        });
        pageInfo.current = 1; // 响应成功回到第一页
      };
      tableRef.current.dataSource = list;
      tableRef.current.pagination = pageInfo;
    }
  }, [list, pageInfo]);
  // 请求数据
  useEffect(() => {
    query();
  }, []);
  return (
    <>
      {tools && tools.length > 0 && (
        <div className="ant-table-tools">
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            {tools.map((tool) => {
              return (
                <Button
                  key={tool.label}
                  {...tool}
                  type={tool.type}
                  onClick={async () => {
                    await tool.onClick?.({
                      refresh: tableRef?.current?.refresh,
                      search: tableRef?.current?.search,
                    });
                  }}
                >
                  {tool.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      <Table
        {...rest}
        rowKey={rowKey}
        dataSource={list}
        pagination={pageInfo as any}
        onChange={async (pagination, filter, sort) => {
          await query({
            pageSize: pagination.pageSize,
            pageNum: pagination.current,
          }, filter, sort);
          /** 接口响应成功才同步页码 */
          pageInfo.pageSize = pagination.pageSize;
          pageInfo.current = pagination.current;
        }}
      />
    </>
  );
};
