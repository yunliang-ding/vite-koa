export default `export default {
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
    {
      title: "个数",
      dataIndex: "num",
      isThousand: true,
    },
    {
      title: "备注",
      dataIndex: "remark",
      isRemark: true,
    },
  ],
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
}`;
