import Drag, { arrayMove } from "../components/material/drag";
import ProForm from "../components/pro/antd/form";
import store from "./store";
import { uuid } from "../util";
import { Tabs } from "antd";
import Monaco from "../monaco";

export default () => {
  const { schema, layout, column } = store.useStore();
  return (
    <div className="canvas">
      <Tabs
        defaultActiveKey="1"
        size="small"
        style={{
          background: "#fff",
          padding: "0 10px",
          width: "100%",
          height: "100%",
        }}
        items={[
          {
            label: "编辑",
            key: "1",
            children: <FormDesign />,
          },
          {
            label: "预览",
            key: "2",
            children: (
              <ProForm layout={layout} column={column} schema={schema} />
            ),
          },
          {
            label: "模型",
            key: "3",
            children: <Monaco readOnly value={store.getPureSchema()} />,
          },
        ]}
      />
    </div>
  );
};

const FormDesign = () => {
  const { schema, layout, column, selectedSchema } = store.useStore();
  return (
    <div className="drag-panel">
      <Drag>
        <ProForm
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
                      store.selectedSchema = newItem;
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
