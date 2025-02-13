export default `export default {
  type: "Form",
  layout: "vertical",
  title: "信息采集",
  okText: "发布",
  style: {
    width: "100%",
    height: 720,
    padding: 10,
  },
  onSubmit(v) {
    alert(JSON.stringify(v));
  },
  initialValues: {
    sex: 0,
    options: [
      {
        label: "选项1",
        value: "1",
      },
      {
        label: "选项2",
        value: "2",
      },
    ],
    contactList: [
      {
        name: "张三",
      },
    ],
  },
  onValuesChange(v, vs){
    console.log(v, vs)
  },
  schema: [{
    type: "RadioGroup",
    name: "sex",
    label: "性别",
    props: {
      options: [
        {
          label: <Antd.Tag color="blue">男</Antd.Tag>,
          value: 0,
        },
        {
          label: <Antd.Tag color="red">女</Antd.Tag>,
          value: 1,
        },
      ],
    },
  },
  {
    type: "InputNumber",
    name: "age",
    label: "年龄",
    effect: ["sex"],
    visible({ getFieldsValue }) {
      return getFieldsValue().sex === 0;
    },
  },
  {
    type: "DatePicker",
    name: "date",
    label: "日期",
  },
  {
    type: "CheckGroup",
    name: "likes",
    label: "爱好",
    props: {
      options: [
        {
          label: "选项1",
          value: 0,
        },
        {
          label: "选项2",
          value: 1,
        },
      ],
    },
    itemRender(dom) {
      return <div style={{ background: "#e6f7e8", width: "100%", padding: 10, marginBottom: 10 }}>{dom}</div>
    }
  },
  {
    type: "TableList",
    name: "options",
    label: "选项",
    props: {
      defaultAddValue: {
        label: "新选项"
      },
      schema: [
        {
          type: "Input",
          name: "label",
          label: "属性名",
        },
        {
          type: "Input",
          name: "label",
          label: "属性值",
        },
      ],
    },
  },
  {
    type: "InputNumber",
    label: "收入总和(元)",
    name: "totalAmount",
    tooltip: "子表单收入合计",
  },
  {
    type: "FormList",
    name: "contactList",
    label: "联系人表单",
    required: true,
    props: {
      title: "联系人",
      maxCount: 3, // 最多3条
      leastOne: true, // 至少一条
      column: 3, // 3列
      defaultAddValue: {
        name: "姓名1",
        type: 1,
        remake: "remake",
      },
      schema: [
        {
          type: "Input",
          name: "name",
          label: "姓名",
          required: true,
        },
        {
          type: "InputNumber",
          name: "amount",
          label: "收入(元)",
          required: true,
          props: {
            onChange() {
              const { contactList } = this.form.getFieldsValue();
              const amounts = contactList.filter(Boolean).map((i) => i.amount);
              if (amounts.length > 0) {
                this.form.setFieldsValue({
                  totalAmount: amounts.reduce((a, b) => a + b, 0),
                });
              }
            },
          },
        },
        {
          type: "Select",
          name: "type",
          label: "类型",
          required: true,
          props: {
            style: {
              width: 100,
            },
            options: [
              {
                label: "选项一",
                value: 1,
              },
              {
                label: "选项二",
                value: 2,
              },
            ],
          },
        },
        {
          type: "Input",
          name: "remake",
          label: "备注",
          required: true,
          effect: ["contactList,type"],
          visible({ getFieldsValue }) {
            const index = this.fullname[1];
            return getFieldsValue().contactList[index]?.type === 1;
          },
        },
      ],
    },
  }]
}`;
