export default `export default {
  title: "数据发布确认",
  width: 600,
  items: [{
    widget: "Input",
    label: "用户名",
    name: "userName",
    required: true,
    props: {
      maxLength: 100,
      onChange: (v) => {
        console.log(v);
      }
    }
  }, {
    widget: "Select",
    label: "性别",
    name: "sex",
    required: true,
    props: {
      options: [{
        label: "男",
        value: 0
      }, {
        label: "女",
        value: 1
      }]
    }
  }, {
    widget: "Select",
    label: "职位",
    name: "position",
    required: true,
    props: {
      options: "{{position}}",
    }
  }, {
    widget: "InputNumber",
    label: "年龄",
    name: "age",
    required: true,
    effect: ["sex"],
    visible: ({ sex }) => {
      return sex === 0;
    },
    props: {
      min: 0,
      max: 200,
    }
  }, {
    widget: "TextArea",
    label: "备注",
    name: "remark",
    required: true,
    props: {
      maxLength: 100,
    }
  }],
  api: "/user/save",
  apiMethod: "POST",
  apiCallBack: () => {
    message.success("提交成功");
    store.openModal = false;
  },
  transformValues: (values) => {
    return {
      ...values,
      processId: store.processId,
    }
  },
  useEffect: () => {
    store.queryOptions();
  }
}`