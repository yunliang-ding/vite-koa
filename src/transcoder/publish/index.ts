import createConstant from "./create-constant";
import createLess from "./create-less";
import createModal from "./create-modal";
import createStore from "./create-store";
import createTable from "./create-table";
import createView from "./create-view";

export default async (code: {
  view: string;
  modal: string;
  dataSource: string;
  style: string;
}): Promise<
  {
    fileName: string;
    code: string;
  }[]
> => {
  const tabs = [];
  const viewTsx = await createView(code.view);
  tabs.push(viewTsx);
  const tableTsx = await createTable(code.view);
  tabs.push(tableTsx);
  const constantTs = await createConstant(code.view);
  tabs.push(constantTs);
  const modalTsx = await createModal(code.modal);
  tabs.push(modalTsx);
  const storeTs = await createStore(code.dataSource);
  tabs.push(storeTs);
  const styleLess = await createLess(code.style);
  tabs.push(styleLess);
  return tabs;
};
