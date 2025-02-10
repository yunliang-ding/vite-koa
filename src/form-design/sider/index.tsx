import { Tabs, Button, Empty } from "antd";
import Drag from "@/components/material/drag";
import material from "../material-config";

export default () => {
  return (
    <div className="sider">
      <Tabs
        size="small"
        style={{
          width: "100%",
          height: "100%",
        }}
        items={[
          {
            label: "基础组件",
            key: "1",
            children: (
              <div className="sider-material-tab">
                <Drag
                  accept={false}
                  items={Object.keys(material).map((key: string) => {
                    return {
                      key,
                      schema: material[key],
                      content: <Button>{key}</Button>,
                    };
                  })}
                />
              </div>
            ),
          },
          {
            label: "业务组件",
            key: "2",
            children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />,
          },
        ]}
      />
    </div>
  );
};
