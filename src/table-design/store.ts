import { encrypt } from "@/transcoder";
import { create } from "@shined/reactive";

export default create({
  openCellModal: {
    open: false,
    index: -1,
  },
  openTableModal: false,
  openFilterDrawer: false,
  filterIds: [""],
  columns: [
    {
      title: "列1",
      dataIndex: "1",
    },
    {
      title: "列2",
      dataIndex: "2",
    },
    {
      title: "列3",
      dataIndex: "3",
    },
    {
      title: "列5",
      dataIndex: "4",
    },
    {
      title: "列5",
      dataIndex: "5",
    },
    {
      title: "列6",
      dataIndex: "6",
    },
    {
      title: "备注",
      dataIndex: "7",
      render: encrypt(`(v, record, index) => {
  return Utils.textWrapRender(v);
}`),
    },
  ],
});
