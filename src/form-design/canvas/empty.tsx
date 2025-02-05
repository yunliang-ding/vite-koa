import { Empty } from "antd";
import Drag from "../../components/material/drag";
import ProForm from "../../components/pro/antd/form";
import { uuid } from "../../components/shared";
import store from "../store";

export default () => {
  const { schema } = store.useStore();
  return (
    <div className="drag-panel">
      <Drag>
        <ProForm
          schema={[
            {
              type() {
                return (
                  <Empty
                    description="拖拽到这里"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                );
              },
              itemRender(dom) {
                return (
                  <Drag.Item
                    dragId="form-design"
                    virtual
                    index={0}
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
                    </div>
                  </Drag.Item>
                );
              },
            },
          ]}
        />
      </Drag>
    </div>
  );
};
