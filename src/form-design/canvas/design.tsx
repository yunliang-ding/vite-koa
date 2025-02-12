import Drag, { arrayMove } from "@/components/material/drag";
import ProForm from "@/components/pro/antd/form";
import { uuid } from "@/components/shared";
import { excutecoder, getPureStringModule } from "@/components/transcoder";
import ErrorBoundaryComponent from "@/error-boundary";
import store from "../store";
import Empty from "./empty";

export default () => {
  const state = store.useSnapshot();
  if (state.schema?.length === 0) {
    return <Empty />;
  }
  const source = getPureStringModule({
    title: state.title,
    layout: state.layout,
    column: state.column,
    schema: state.schema,
    okText: state.okText,
  });
  // 开始解析 store
  const result = excutecoder(state.stateCode);
  // 开始解析模型
  const props: any = excutecoder(`export default ${source}`, {
    store: {
      snap: result.store.mutate,
      mutate: result.store.mutate,
    },
  });
  return (
    <ErrorBoundaryComponent>
      <div className="drag-panel">
        <Drag>
          <ProForm
            title={props.title}
            okText={props.okText}
            layout={props.layout}
            column={props.column}
            schema={props.schema?.map((item: any, currentIndex: number) => {
              return {
                ...item,
                visible: () => true,
                itemRender(dom: any) {
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
    </ErrorBoundaryComponent>
  );
};
