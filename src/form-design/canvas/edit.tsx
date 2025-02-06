import Drag, { arrayMove } from "@/components/material/drag";
import ProForm from "@/components/pro/antd/form";
import { uuid } from "@/components/shared";
import store from "../store";
import Empty from "./empty";

export default () => {
  const { schema, layout, title, column, selectedSchema, okText } = store.useStore();
  if (schema?.length === 0) {
    return <Empty />;
  }
  return (
    <div className="drag-panel">
      <Drag>
        <ProForm
          title={title}
          okText={okText}
          layout={layout}
          column={column}
          schema={schema?.map((item, currentIndex: number) => {
            return {
              ...item,
              itemRender(dom) {
                return (
                  <Drag.Item
                    dragId="form-design"
                    index={currentIndex}
                    selected={item.key === selectedSchema?.key}
                    onDrop={(targetIndex: number) => {
                      if (String(currentIndex) === String(targetIndex)) {
                        return;
                      }
                      const newList = arrayMove(
                        schema,
                        currentIndex,
                        targetIndex
                      );
                      store.schema = newList;
                    }}
                    onSelected={() => {
                      store.selectedSchema = item;
                    }}
                    onDelete={() => {
                      schema.splice(currentIndex, 1);
                      store.selectedSchema = undefined;
                      store.schema = [...store.schema];
                    }}
                    onCopy={() => {
                      schema.splice(currentIndex + 1, 0, {
                        ...item,
                        key: uuid(),
                      });
                      store.schema = [...store.schema];
                    }}
                    onAdd={(addItem: any, index: number) => {
                      const key = uuid();
                      const newItem = {
                        ...addItem.schema,
                        key,
                        name: key,
                      };
                      delete newItem.propsConfig;
                      schema.splice(index, 0, newItem);
                      if(selectedSchema === undefined){
                        store.selectedSchema = newItem;
                      }
                      store.schema = [...store.schema];
                    }}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {dom}
                      <div className="key-info">{item.key}</div>
                    </div>
                  </Drag.Item>
                );
              },
            };
          })}
        />
      </Drag>
    </div>
  );
};
