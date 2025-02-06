import {
  DragOutlined,
  FormOutlined,
  TableOutlined,
  UploadOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import "./index.less";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <div id="components-layout-demo-custom-trigger">
      <Layout>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="horizontal"
            items={[
              {
                key: "/drag",
                icon: <DragOutlined />,
                label: "Drag 组件",
              },
              {
                key: "/template",
                icon: <FolderOutlined />,
                label: "模版列表",
                children: [
                  {
                    key: "/template/form",
                    icon: <FormOutlined />,
                    label: "提交表单模版",
                  },
                  {
                    key: "/template/table",
                    icon: <TableOutlined />,
                    label: "报表模版",
                  },
                ],
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
          />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default App;
