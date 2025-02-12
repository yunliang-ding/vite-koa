import Drag, { arrayMove } from "@/components/material/drag";
import ProForm from "@/components/pro/antd/form";
import { uuid } from "@/components/shared";
import store from "../store";
import Empty from "./empty";

export default () => {
  const state = store.useSnapshot();
  if (state.schema?.length === 0) {
    return <Empty />;
  }
  return (
    <div className="drag-panel">
      <Drag>
        <ProForm
          title={state.title}
          okText={state.okText}
          layout={state.layout}
          column={state.column}
          schema={state.schema?.map((item, currentIndex: number) => {
            return {
              ...item,
              itemRender(dom) {
                return (
                  <Drag.Item
                    dragId="form-design"
                    index={currentIndex}
                    selected={item.key === state.selectKey}
                    onDrop={(targetIndex: number) => {
                      if (String(currentIndex) === String(targetIndex)) {
                        return;
                      }
                      const newList = arrayMove(
                        store.mutate.schema,
                        currentIndex,
                        targetIndex
                      );
                      store.mutate.schema = newList;
                    }}
                    onSelected={() => {
                      store.mutate.selectKey = item.key;
                    }}
                    onDelete={() => {
                      store.mutate.schema.splice(currentIndex, 1);
                      store.mutate.selectKey = undefined;
                      store.mutate.schema = [...store.mutate.schema];
                    }}
                    onCopy={() => {
                      store.mutate.schema.splice(currentIndex + 1, 0, {
                        ...item,
                        key: uuid(),
                      });
                      store.mutate.schema = [...store.mutate.schema];
                    }}
                    onAdd={(addItem: any, index: number) => {
                      const key = uuid();
                      const newItem = {
                        ...addItem.schema,
                        key,
                        name: key,
                      };
                      delete newItem.propsConfig;
                      store.mutate.schema.splice(index, 0, newItem);
                      if (state.selectKey === undefined) {
                        store.mutate.selectKey = newItem.key;
                      }
                      store.mutate.schema = [...store.mutate.schema];
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
