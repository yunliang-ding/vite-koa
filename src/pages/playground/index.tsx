import Form from "../../components/pro/antd/form";

export default () => {
  return (
    <Form
      layout="vertical"
      style={{
        width: 500,
        padding: 10
      }}
      initialValues={{
        sex: 0,
      }}
      schema={[
        {
          type: 'RadioGroup',
          name: 'sex',
          label: '性别',
          props: {
            options: [
              {
                label: '男',
                value: 0,
              },
              {
                label: '女',
                value: 1,
              },
            ],
          },
        },
        {
          type: 'InputNumber',
          name: 'age',
          label: '年龄',
          effect: ["sex"],
          visible({ getFieldsValue }) {
            console.log(getFieldsValue());
            return getFieldsValue().sex === 0;
          },
        },
      ]}
    />
  );
};
