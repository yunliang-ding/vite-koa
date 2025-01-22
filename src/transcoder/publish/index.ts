import createConstant from "./create-constant";
import createModal from "./create-modal";
import createStore from "./create-store";
import createTable from "./create-table";
import createView from "./create-view";

export default async (
  code: string
): Promise<
  {
    fileName: string;
    code: string;
  }[]
> => {
  const tabs = [];
  try {
    const data = new Function(`return ${code.replace("export default", "")}`)();
    const viewTsx = await createView(data.view);
    tabs.push(viewTsx);
    const modalTsx = await createModal(data.modal);
    tabs.push(modalTsx);
    const tableTsx = await createTable(data.view);
    tabs.push(tableTsx);
    const constantTs = await createConstant(data.view);
    tabs.push(constantTs);
    const storeTs = await createStore(data.store);
    tabs.push(storeTs);
  } catch (error) {
    console.error(error);
    tabs.push({
      fileName: "Error",
      code: String(error),
    });
  }
  return tabs;
};
