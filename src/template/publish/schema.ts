export default `export default {
  modal: {
    title: "数据发布确认",
    width: 600,
    items: [
      {
        widget: "Input",
        label: "用户名",
        name: "userName",
        required: true,
        props: {
          maxLength: 100,
          onChange: (v) => {
            console.log(v);
          },
        },
      },
      {
        widget: "Select",
        label: "性别",
        name: "sex",
        required: true,
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
        widget: "Select",
        label: "职位",
        name: "position",
        required: true,
        props: {
          options: "{{position}}",
        },
      },
      {
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
        },
      },
      {
        widget: "TextArea",
        label: "备注",
        name: "remark",
        required: true,
        props: {
          maxLength: 100,
        },
      },
    ],
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
      };
    },
    useEffect: () => {
      store.queryOptions();
    },
  },
  view: {
    search: [
      {
        widget: "Input",
        label: "任务号",
        name: "processName",
        readOnly: true,
      },
      {
        widget: "RangeDate",
        label: "预估时间",
        name: "dateRange",
      },
      {
        widget: "TreeSelect",
        label: "品牌-市场",
        name: "snapshotIds",
        required: true,
        props: {
          allowClear: true,
          treeData: "{{marketOptions}}",
          treeCheckable: true,
          multiple: true,
          placeholder: "请选择品牌-市场",
          treeDefaultExpandAll: true,
          treeNodeFilterProp: "title",
          showSearch: true,
          fieldNames: {
            value: "id",
            label: "title",
          },
        },
      },
      {
        widget: "Select",
        label: "类型",
        name: "type",
        required: true,
        props: {
          options: "{{typeOptions}}",
          allowClear: true,
          placeholder: "请选择",
          mode: "multiple",
          fieldNames: {
            label: "title",
            value: "id",
          },
        },
      },
    ],
    columns: [
      {
        title: "品牌",
        dataIndex: "userName",
      },
      {
        title: "市场",
        dataIndex: "positon",
      },
      {
        title: "类型",
        dataIndex: "userName",
      },
      {
        title: "月份",
        dataIndex: "positon",
      },
      {
        title: "周数",
        dataIndex: "userName",
        dimension: {
          name: "aggWithDate",
          defaultChecked: true,
        },
      },
      {
        title: "日期",
        dataIndex: "date",
        dimension: {
          name: "aggWithDate",
          defaultChecked: false,
        },
      },
    ],
    api: "/user/list",
    apiMethod: "POST",
    transformValues: (values) => {
      return {
        ...values,
        predictEndDate: values.dateRange?.[0].format("YYYY-MM-DD"),
        predictStartDate: values.dateRange?.[1].format("YYYY-MM-DD"),
        processId: store.processId,
      };
    },
    useMemo: () => {
      store.form = form;
      if (props?.match?.query?.processId) {
        store.processId = props?.match?.query?.processId;
        store.taskId = props?.match?.query?.taskId;
        store.queryProcessInfo();
        store.queryOptions();
      }
      store.queryTable();
    },
  },
  store: {
    userInfo: [],
    async queryOptions() {},
  },
}`;
