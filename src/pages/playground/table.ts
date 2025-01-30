export default `export default {
  type: "Table",
  useRefresh: true,
  useFilter: true,
  bordered: true,
  autoNo: true,
  scroll: {
    x: 1200,
    y: 600,
  },
  search: {
    column: 3,
    schema: [
      {
        type: 'Input',
        name: 'name',
        label: '用户姓名',
      },
      {
        type: 'Select',
        name: 'sex',
        label: '性别',
      },
    ],
  },
  tools: [
    {
      label: '添加',
      type: 'primary',
      onClick({ refresh }) {
        console.log(refresh);
      },
    },
  ],
  columns: [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '姓名',
      dataIndex: 'username',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      enums: ['男', '女'],
    },
    {
      title: '城市',
      dataIndex: 'city',
    },
    {
      title: '签名',
      dataIndex: 'sign',
    },
    {
      title: '登录次数',
      dataIndex: 'logins',
    },
    {
      title: '分类',
      dataIndex: 'classify',
    },
    {
      title: '分数',
      dataIndex: 'score',
    },
  ],
  rowOperations: {
    width: 240,
    menus: ({ record, refresh, index }) => [
      {
        label: '编辑',
        disabled: index === 0,
        onClick() {
          console.log(record);
        },
      },
      {
        label: '查看',
        onClick() {
          console.log(record);
        },
      },
      {
        label: '删除',
        async onClick() {
          await new Promise((res) => setTimeout(res, 1000));
          message.success('已删除!');
          await refresh?.();
          console.log(record);
        },
      },
    ],
  },
  request: async (params) => {
    const res = await axios.get(
      'https://api-online.yunliang.cloud/lyr-component/table',
      {
        params,
      },
    );
    return {
      success: res.data.success,
      data: res.data.list,
      total: res.data.total,
    };
  }
}`;
