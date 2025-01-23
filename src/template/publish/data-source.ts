export default `export default {
  variables: {
    loading: false,
    processId: "",
    position: [],
    marketOptions: [],
    typeOptions: [],
    dataSource: [],
  },
  functions: [{
    name: "queryOptions",
    openSpin: true,
    api: "/user/options",
    apiMethod: "POST",
    params: async () => {
      const values = await this.searchForm.validateFields();
      return {
        ...values,
        processId: this.processId,
      }
    },
    assignment: {
      position: "res.info.position",
      marketOptions: "res.info.market",
      typeOptions: "res.info.type"
    },
  }]
}`