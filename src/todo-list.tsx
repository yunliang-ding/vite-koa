import { useEffect } from "react";
import store from "./store";
import {
  Space,
  Button,
  Table,
  Drawer,
  Modal,
  Form,
  Input,
  InputNumber,
} from "@arco-design/web-react";

export default () => {
  const [form] = Form.useForm();
  const { data, loading, visible, modalVisible } = store.useStore();
  useEffect(() => {
    visible && store.queryUser();
  }, [visible]);
  return (
    <Drawer
      title="CRUD DEMO"
      visible={visible}
      width={840}
      footer={null}
      onCancel={() => {
        store.visible = false;
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 0",
        }}
      >
        <Button
          type="secondary"
          onClick={() => {
            store.modalVisible = true;
            form.resetFields();
          }}
        >
          新增
        </Button>
      </div>
      <Table
        rowKey="id"
        style={{
          width: 800
        }}
        loading={loading}
        pagination={false}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            width: 200
          },
          {
            title: "姓名",
            dataIndex: "name",
          },
          {
            title: "年龄",
            dataIndex: "age",
          },
          {
            title: "操作",
            width: 100,
            render(_a, record: any) {
              return (
                <Space>
                  <Button
                    type="primary"
                    status="warning"
                    onClick={() => {
                      store.modalVisible = true;
                      form.setFieldsValue({
                        ...record,
                      });
                    }}
                  >
                    修改
                  </Button>
                  <Button type="primary" status="danger" onClick={() => {
                      store.removeUser(record.id);
                    }}>
                    删除
                  </Button>
                </Space>
              );
            },
          },
        ]}
        data={data}
      />
      <Modal
        title="Save&Update"
        visible={modalVisible}
        onCancel={() => {
          store.modalVisible = false;
        }}
        onOk={async () => {
          const data = await form.validate();
          await store.saveOrUpdate(data);
          store.modalVisible = false;
        }}
      >
        <Form form={form}>
          <Form.Item hidden field="id">
            <Input />
          </Form.Item>
          <Form.Item
            label="用户名"
            field="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            field="age"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber placeholder="年龄" />
          </Form.Item>
        </Form>
      </Modal>
    </Drawer>
  );
};
