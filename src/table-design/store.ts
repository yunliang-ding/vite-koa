import { create } from "@shined/reactive";

export default create({
  openCellModal: false,
  openFilterDrawer: false,
  filterIds: [""],
  columns: [
    {
      title: "ID",
      dataIndex: "id",
    },
  ],
});
