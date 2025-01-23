export default `export default {
  variables: {
    loading: false,
    pagination: [],
    marketOptions: [],
    typeOptions: [],
    dataSource: [],
    processId: "",
  },
  functions: [
    {
      name: "queryList",
      api: "/user/list",
      apiMethod: "POST",
      openSpin: true,
    },
    {
      name: "publish",
      api: "/user/publish",
      apiMethod: "POST",
    },
    {
      name: "queryOptions",
      openSpin: true,
      api: "/user/options",
      apiMethod: "POST",
    },
    {
      name: "exportData",
      api: "/user/export",
      apiMethod: "POST",
    },
  ],
};
`