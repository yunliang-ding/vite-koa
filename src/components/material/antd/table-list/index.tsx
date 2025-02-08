import { getWidget } from "@/components/pro/antd/form/widget";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { TableListProps } from "./type";

export default ({
  value,
  onChange,
  schema = [],
  maxCount = 10,
  leastOne = true,
  defaultAddValue = {},
  ...rest
}: TableListProps) => {
  const [dataSource, setDataSource] = useState(value);
  useEffect(() => {
    setDataSource(value);
  }, [value]);
  return (
    <>
      <Table
        {...rest}
        pagination={false}
        bordered
        dataSource={dataSource}
        columns={[
          ...schema.map((item) => {
            return {
              title: item.label,
              dataIndex: item.name,
              render(v: string | number, record: any) {
                const Component = getWidget(item.type);
                return (
                  <Component
                    defaultValue={v}
                    onChange={(e: any) => {
                      record[item.name] = e.target ? e.target.value : e;
                      setDataSource(dataSource);
                      onChange(dataSource);
                    }}
                  />
                );
              },
            } as any;
          }),
          {
            title: "操作",
            dataIndex: "_operation_",
            render(_, __, index: number) {
              return (
                <Space>
                  <Button
                    type="link"
                    onClick={() => {
                      dataSource.splice(index, 1);
                      setDataSource([...dataSource]);
                      onChange(dataSource);
                    }}
                    style={{
                      paddingLeft: 0,
                    }}
                  >
                    删除
                  </Button>
                </Space>
              );
            },
          },
        ]}
      />
      <Button
        type="dashed"
        style={{ marginTop: 10 }}
        onClick={() => {
          dataSource.push(defaultAddValue);
          setDataSource([...dataSource]);
          onChange(dataSource);
        }}
        disabled={dataSource.length >= maxCount}
        block
        icon={<PlusOutlined />}
      >
        添加
      </Button>
    </>
  );
};
