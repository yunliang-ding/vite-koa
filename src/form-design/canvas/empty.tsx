import { Empty } from "antd";
import Drag from "@/components/material/drag";
import ProForm from "@/components/pro/antd/form";
import { uuid } from "@/components/shared";
import store from "../store";

export default () => {
  return (
    <div className="drag-panel">
      <Drag>
        <ProForm
          schema={[
            {
              name: "__empty__",
              type() {
                return (
                  <Empty
                    description="拖拽到这里"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                      height: "80vh",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
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
                      store.mutate.schema.splice(index, 0, newItem);
                      store.mutate.selectKey = newItem.key;
                      store.mutate.schema = [...store.mutate.schema];
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
