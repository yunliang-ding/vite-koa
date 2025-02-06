import {
  MenuOutlined,
  FormOutlined,
  TableOutlined,
  JavaScriptOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.less";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="horizontal"
          onClick={(v) => {
            navigate(v.key)
          }}
          items={[
            {
              key: "/drag",
              icon: <MenuOutlined />,
              label: "Drag 组件",
            },
            {
              key: "/template",
              icon: <FolderOutlined />,
              label: "业务模版",
              children: [
                {
                  key: "/template/form",
                  icon: <FormOutlined />,
                  label: "表单模版",
                },
                {
                  key: "/template/table",
                  icon: <TableOutlined />,
                  label: "报表模版",
                  disabled: true,
                },
              ],
            },
            {
              key: "/playground",
              icon: <JavaScriptOutlined />,
              label: "Playground",
            },
          ]}
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;
