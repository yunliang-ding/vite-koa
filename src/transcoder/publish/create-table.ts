export default async (view: string) => {
  try {
    const data = new Function(`return ${view.replace("export default", "")}`)();
    const hooks = `import React from "react";
import { ExportOutlined } from "@ant-design/icons";
import { columns, deminsionsOptions } from "./constant";
import { LoadingButton, SummaryTable, DimensionSetting } from "@shein-component/frontend-low-code/material";
import store from "./state";

export default () => {
  const { dataSource, deminsions, loading, pagination } = store.useStore();
  return (
    <div>
      <div>
        ${
          data.columns.some((i: any) => i.dimension !== undefined)
            ? `<DimensionSetting
          deminsions={deminsions}
          settingDisabled={dataSource.length === 0}
          onSetDimensions={(d: any) => {
            store.pagination.pageNumber = 1;
            store.deminsions = d;
            store.queryTable();
          }}
          options={deminsionsOptions}
        />`
            : ""
        }
        <LoadingButton
          style={{ marginLeft: 10 }}
          disabled={dataSource.length === 0}
          type="primary"
          onClick={async () => {
            await store.exportData();
          }}
          icon={<ExportOutlined />}
        >
          导出
        </LoadingButton>
      </div>
      <SummaryTable
        style={{ width: "100%", height: "100%" }}
        scroll={{
          y: "100%",
          x: "100%",
        }}
        rowKey={(row: any) => Object.values(row).join(",")}
        // 按照维度过滤下
        columns={columns.filter((i: any) => {
          const item = deminsionsOptions.find(
            (d: any) => d.value === i.dataIndex
          );
          if (item) {
            return deminsions.includes(item.value);
          }
          return true;
        })}
        loading={loading}
        pagination={
          dataSource.length > 0 && {
            pageSize: pagination.pageSize,
            current: pagination.pageNumber,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total: number) => \`Total $\{total\} \`,
          }
        }
        dataSource={dataSource}
        onChange={(v: any) => {
          store.pagination.pageNumber = v.current;
          store.pagination.pageSize = v.pageSize;
          store.queryTable(false);
        }}
      />
    </div>
  );
};
`;
    return {
      fileName: "table.tsx",
      code: hooks,
    };
  } catch (error) {
    return {
      fileName: "table.tsx",
      code: String(error),
      error: true,
    };
  }
};
