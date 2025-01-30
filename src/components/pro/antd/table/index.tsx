import { useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import { transformColumns } from "./util";
import { ProTableProps, ProTableRef } from "./type";
import FilterDrawer from "./filter-drawer";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import Button from "../../../material/antd/button";
import Table from "./table";
import Search from "../search";
import "./index.less";

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
  ...rest
}: ProTableProps) => {
  const [loading, setLoading] = useState(false); // 控制loading
  const [openFilter, setOpenFilter] = useState(false);
  const [filterIds, setFilterIds] = useState(defaultFilterIds || []);
  const innerTools = [...tools];
  /** 内部维护下列 */
  const [columns, setColumns] = useState(rest.columns || []);
  useEffect(() => {
    setColumns(rest.columns || []);
  }, [rest.columns]);
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
      className: "btn-tool",
      async onClick() {
        await tableRef.current?.refresh?.();
      },
    });
  }
  // 解析 columns
  const lastColumns = [...transformColumns(columns)].filter(
    (i) => !filterIds.includes(i.dataIndex)
  );
  if (rowOperations) {
    const { width, menus } = rowOperations;
    lastColumns.push({
      title: "操作",
      width,
      dataIndex: "ant-table-row-operation",
      fixed: "right",
      render(_: any, record: any, index: number) {
        return (
          <div className="ant-table-row-operation">
            {menus({
              record,
              refresh: tableRef.current?.refresh,
              search: tableRef.current?.search,
              index,
            }).map((item) => {
              return (
                <Button key={item.label} {...item} type={item.type || "link"} />
              );
            })}
          </div>
        );
      },
    });
  }
  return (
    <>
      <Spin spinning={loading}>
        {search.schema.length > 0 && (
          <Search
            {...search}
            onReset={async (vs: any) => {
              await tableRef?.current?.search?.(vs);
            }}
            onSearch={async (vs: any) => {
              await tableRef?.current?.search?.(vs);
            }}
          />
        )}
        <Table
          {...rest}
          tableRef={tableRef}
          tools={innerTools}
          setLoading={setLoading}
          columns={lastColumns}
        />
      </Spin>
      {openFilter && (
        <FilterDrawer
          {...{
            filterIds,
            setFilterIds,
            columns,
            setColumns,
            onClose: () => {
              setOpenFilter(false);
            }
          }}
        />
      )}
    </>
  );
};
