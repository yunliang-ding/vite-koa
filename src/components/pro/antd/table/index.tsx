import { useEffect, useRef, useState } from "react";
import { Button, Form, Spin } from "antd";
import { transformColumns } from "./util";
import { ProTableProps, ProTableRef } from "./type";
import FilterDrawer from "./filter-drawer";
import Table from "./table";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import "./index.less";

const Contianer = ({ search, form, tableRef, columns, ...rest }: any) => {
  const [loading, setLoading] = useState(false); // 控制loading
  return (
    <Spin spinning={loading}>
      {/* {search.schema.length > 0 && (
        <Search
          {...search}
          onReset={async () => {
            form.clearValues({});
            await tableRef.current.search(form.getValues());
          }}
          onSearch={async () => {
            await tableRef.current.search(form.getValues());
          }}
        />
      )} */}
      <Table
        tableRef={tableRef}
        setLoading={setLoading}
        {...rest}
        columns={columns}
      />
    </Spin>
  );
};

export default ({
  tableRef = useRef<ProTableRef>({}),
  search = {
    schema: [],
    column: 3,
  },
  tools = [],
  defaultFilterIds = [],
  rowOperations,
  useRefresh = true,
  useFilter = true,
  style = {},
  autoNo = false,
  ...rest
}: ProTableProps) => {
  /** 内部维护下列 */
  const [columns, setColumns] = useState(rest.columns || []);
  useEffect(() => {
    setColumns(rest.columns || []);
  }, [rest.columns]);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterIds, setFilterIds] = useState(defaultFilterIds || []);
  const innerTools = [...tools];
  if (useFilter) {
    innerTools.push({
      icon: <FilterOutlined />,
      className: "btn-tool",
      onClick() {
        setOpenFilter(true);
      },
    });
  }
  if (useRefresh) {
    innerTools.push({
      icon: <ReloadOutlined />,
      type: "primary",
      className: "btn-tool",
      async onClick() {
        await tableRef.current?.refresh?.();
      },
    });
  }
  // 查询表单实例
  const form = Form.useForm();
  // 解析 cloums
  const lastColums = [...transformColumns(columns)].filter(
    (i) => !filterIds.includes(i.dataIndex)
  );
  // 自增序号
  if (autoNo) {
    lastColums.unshift({
      title: "序号",
      fixed: "left",
      dataIndex: "yld-serial-number",
      width: 80,
      render: (_: any, __: any, index: number) => {
        if (rest.pagination) {
          return (
            // @ts-ignore
            (rest.pagination?.current - 1) * rest.pagination.pageSize +
            index +
            1
          );
        }
        return index + 1;
      },
    });
  }
  if (rowOperations) {
    const { width, menus } = rowOperations;
    lastColums.push({
      title: "操作",
      width,
      dataIndex: "yld-table-row-operation",
      fixed: "right",
      render(_: any, record: any, index: number) {
        return (
          <div className="yld-table-row-operation">
            {menus({
              record,
              refresh: tableRef.current?.refresh,
              search: tableRef.current?.search,
              index,
            }).map((item) => {
              return (
                <Button key={item.label} {...item} type={item.type || "link"}>
                  {item.label}
                </Button>
              );
            })}
          </div>
        );
      },
    });
  }
  return (
    <>
      <Contianer
        tableRef={tableRef}
        form={form}
        search={search}
        tools={innerTools}
        {...rest}
        columns={lastColums}
      />
      {openFilter && (
        <FilterDrawer
          {...{
            filterIds,
            setFilterIds,
            columns,
            setColumns,
          }}
        />
      )}
    </>
  );
};
