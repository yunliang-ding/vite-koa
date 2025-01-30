import { useRef } from "react";
import { Form, Space } from "antd";
import { ProFormProps } from "../form/type";
import ProForm from "../form";
import Button from "../../../material/antd/button";
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";

export interface SearchProps extends Omit<ProFormProps, "onReset"> {
  onReset?: Function;
  onSearch?: Function;
}

export default ({
  onReset = () => {},
  onSearch = () => {},
  column = 3,
  schema = [],
  layout = "horizontal",
  initialValues,
}: SearchProps) => {
  const loadingRef = useRef<boolean>(false); // 防止重复点击
  const [form] = Form.useForm();
  return (
    <ProForm
      layout={layout}
      form={form}
      className="ant-search"
      column={column}
      initialValues={initialValues}
      schema={[
        ...schema,
        {
          className: "ant-search-flex-btn",
          style: {
            gridColumn: column,
          },
          type() {
            return (
              <Space>
                <Button
                  icon={<ClearOutlined />}
                  onClick={async () => {
                    if (loadingRef.current) {
                      return;
                    }
                    try {
                      loadingRef.current = true;
                      form.resetFields();
                      const values = await form.validateFields();
                      await onReset?.(values);
                    } catch (error) {
                      console.log(error);
                    } finally {
                      loadingRef.current = false;
                    }
                  }}
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={async () => {
                    try {
                      if (loadingRef.current) {
                        return;
                      }
                      const values = await form.validateFields();
                      await onSearch?.(values);
                    } catch (error) {
                      console.log(error);
                    } finally {
                      loadingRef.current = false;
                    }
                  }}
                >
                  查询
                </Button>
              </Space>
            );
          },
        } as any,
      ]}
    />
  );
};
