export default `export default {
  type: "Form",
  layout: "vertical",
  style: {
    width: 500,
    padding: 10,
  },
  initialValues: {
    sex: 0,
    contactList: [
      {
        name: "张三",
      },
    ],
  },
  schema: [{
    type: "RadioGroup",
    name: "sex",
    label: "性别",
    props: {
      options: [
        {
          label: "男",
          value: 0,
        },
        {
          label: "女",
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
