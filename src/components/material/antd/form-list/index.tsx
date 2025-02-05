import { Button, Form, Space } from "antd";
import { FormListProps } from "./type";
import { PlusOutlined } from "@ant-design/icons";
import { Fragment } from "react/jsx-runtime";
import Item from "../../../pro/antd/form/item";

export default ({
  required,
  column = 3,
  label,
  name,
  maxCount = 10,
  leastOne = true,
  schema = [],
  ...rest
}: FormListProps) => {
  return (
    <Form.Item required={required} label={label}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => {
              return (
                <Fragment key={field.key}>
                  <Space align="center">
                    {schema?.map(({ props, ...item }) => {
                      const effect = item.effect?.slice();
                      if(effect){
                        effect.forEach((i: string, idx: string | number) => {
                          if(i.includes(',')){
                            effect[idx] = i.replace(",", `,${field.key},`) 
                          }
                        })
                      }
                      return (
                        <Item
                          {...item}
                          {...rest}
                          effect={effect}
                          name={[field.name, item.name]}
                          fullname={[name, field.name, item.name]} // 子表单完整的名字
                          key={[field.name, item.name].toString()}
                          props={props}
                        />
                      );
                    })}
                    <Button
                      size="small"
                      type="link"
                      onClick={() => remove(field.name)}
                      disabled={leastOne && fields.length === 1}
                    >
                      删除
                    </Button>
                  </Space>
                </Fragment>
              );
            })}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                disabled={fields.length >= maxCount}
                block
                icon={<PlusOutlined />}
              >
                添加一项
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};
