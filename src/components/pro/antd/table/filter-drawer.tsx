/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Checkbox, Drawer, Space } from "antd";
import { HolderOutlined } from "@ant-design/icons";
import Drag from "../../../material/drag";
import { ProTableColumnProps } from "./type";

interface FilterProps {
  columns: ProTableColumnProps[];
  filterIds: string[];
  setFilterIds: Function;
  setColumns: Function;
  onClose: Function;
}

export default ({
  onClose,
  columns,
  filterIds,
  setFilterIds,
  setColumns,
}: FilterProps) => {
  const [hiddenIds, setHiddenIds] = useState<string[]>(filterIds || []);
  const [indeterminate, setIndeterminate] = useState(false);
  useEffect(() => {
    setIndeterminate(hiddenIds.length > 0 && hiddenIds.length < columns.length);
  }, [hiddenIds]);
  return (
    <Drawer
      open
      onClose={() => {
        onClose();
      }}
      {...{
        title: "列设置",
        width: 300,
        footer: false,
        style: {
          minWidth: 300,
        },
      }}
    >
      <div className="ant-table-filter">
        <div className="ant-table-filter-item" style={{ paddingLeft: 9 }}>
          <Checkbox
            indeterminate={indeterminate}
            checked={hiddenIds.length === 0}
            onChange={(e: any) => {
              if (e.target.checked) {
                setHiddenIds([]);
                setFilterIds([]);
              } else {
                setHiddenIds(columns.map((i: any) => i.dataIndex));
                setFilterIds(columns.map((i: any) => i.dataIndex));
              }
            }}
          >
            全选
          </Checkbox>
        </div>
        <Drag
          style={{
            gap: 20,
          }}
          selected={false}
          key={hiddenIds.length}
          onChange={(items: any) => {
            // 调整顺序
            setColumns(items.map((i: any) => i.column));
          }}
          items={columns.map((column: any) => {
            return {
              key: column.dataIndex,
              column,
              content: (
                <div>
                  <div className="ant-table-filter-item">
                    <Space>
                      <HolderOutlined />
                      <Checkbox
                        checked={!hiddenIds.includes(column.dataIndex)}
                        onChange={(e: any) => {
                          if (e.target.checked) {
                            const idx = hiddenIds.findIndex(
                              (i) => i === column.dataIndex
                            );
                            hiddenIds.splice(idx, 1);
                          } else {
                            hiddenIds.push(column.dataIndex);
                          }
                          setHiddenIds([...hiddenIds]);
                          setFilterIds([...hiddenIds]);
                        }}
                      >
                        {column.title}
                      </Checkbox>
                    </Space>
                  </div>
                </div>
              ),
            };
          })}
        />
      </div>
    </Drawer>
  );
};
