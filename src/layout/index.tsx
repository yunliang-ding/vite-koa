import {
  MenuOutlined,
  FormOutlined,
  TableOutlined,
  JavaScriptOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import formCode from "./form";
import tableCode from "./table";
import "./index.less";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.hash.substr(1) || "/drag"]}
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
                },
              ],
            },
            {
              key: "/playground",
              icon: <JavaScriptOutlined />,
              label: "Playground",
              children: [
                {
                  key: `/playground?code=${encodeURIComponent(formCode)}`,
                  icon: <FormOutlined />,
                  label: "Form",
                },
                {
                  key: `/playground?code=${encodeURIComponent(tableCode)}`,
                  icon: <TableOutlined />,
                  label: "Table",
                },
              ],
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
