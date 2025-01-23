import { decrypt, parserObjectToString, prettierFormat } from "../util";

export default async (view: string) => {
  try {
    const data = new Function(`return ${view.replace("export default", "")}`)();
    const storeDep: any = [];
    const widgetDep: any = [];
    const JSX = `<div>
    <Form from={form}>
      <Row gutter={12}>
      ${data.search
        .map((item: any) => {
          const itemPrps = {
            ...item,
            widget: undefined,
            props: undefined,
          };
          widgetDep.push(item.widget); // 设置资源
          return `<Col span={${item.span ? item.span : 24 / (data.column || 1)}}>
        <Form.Item ${parserObjectToString(itemPrps, storeDep)}>
          <${item.widget} ${parserObjectToString(item.props, storeDep)} />
        </Form.Item>
      </Col>`;
        })
        .join("\n")}
        <Col
          span={4}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Space>
            <Button
              type="primary"
              onClick={async () => {
                await store.queryTable();
              }}
            >
              查询
            </Button>
            <Button
              type="primary"
              onClick={() => {
                store.openModal = true;
              }}
            >
              发布
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
    <div style={{ marginTop: 10 }}>
      <Table />
    </div>
    {openModal && <PublishModal />}
  </div>`;
    const hooks = `import React from "react";
  import { Form, Row, Col, Button, Space } from "antd";
  ${widgetDep.length > 0 ? ["import {", [...new Set(widgetDep)].join(", "), '} from "@shein-component/frontend-low-code/material"'].join("") : ""};
  import store from "./store";
  import Table from './table';
  import PublishModal from './modal';

  export default (props: any) => {
  const [form] = Form.useForm();
  ${storeDep.length > 0 ? ["const {", [...new Set(storeDep)].join(", "), "} = store.useStore()"].join("") : ""}
  ${data.useEffect ? ["React.useEffect(", data.useEffect.toString(), ", [])"].join("") : ""};
  ${data.useMemo ? ["React.useMemo(", data.useMemo.toString(), ", [])"].join("") : ""};
  return ${JSX}
  };
  `;
    return {
      fileName: "view.tsx",
      code: await prettierFormat(decrypt(hooks)),
    };
  } catch(error) {
    return {
      error: true,
      fileName: "view.tsx",
      code: String(error)
    };
  };
}