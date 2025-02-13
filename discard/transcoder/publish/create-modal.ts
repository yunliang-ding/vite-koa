import { decrypt, parserObjectToString, prettierFormat } from "../util";

export default async (modal: string) => {
  try {
    const data = new Function(`return ${modal.replace("export default", "")}`)();
    const storeDep: any = [];
    const widgetDep: any = [];
    const JSX = `<Modal 
      style={{width: ${data.width}}} 
      open
      title="${data.title}"
      okButtonProps={{
        loading,
      }}
      cancelButtonProps={{
        disabled: loading,
      }}
      onOk={async () => {
        setLoading(true);
        await store.publish();
        setLoading(false);
      }}
      onCancel={() => {
        store.openModal = false;
      }}
    >
    <Form from={form}>
      <Row gutter={12}>
      ${data.items
        .map((item: any) => {
          const itemPrps = {
            ...item,
            widget: undefined,
            props: undefined,
          };
          widgetDep.push(item.widget); // 设置资源
          return `<Col span={${item.span ? item.span : 24 / (data.column || 1)}}>
        <Form.Item ${parserObjectToString(itemPrps, storeDep)} >
          <${item.widget} ${parserObjectToString(item.props, storeDep)} />
        </Form.Item>
      </Col>`;
        })
        .join("\n")}
      </Row>
    </Form>
  </Modal>`;
    const hooks = `import React from "react";
import { Form, Row, Col, Modal } from "antd";
${widgetDep.length > 0 ? ["import {", [...new Set(widgetDep)].join(", "), '} from "@shein-component/frontend-low-code/material"'].join("") : ""};
import store from "./store";

export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  ${storeDep.length > 0 ? ["const {", [...new Set(storeDep)].join(", "), "} = store.useStore()"].join("") : ""}
  ${data.useEffect ? ["useEffect(", data.useEffect.toString(), ", [])"].join("") : ""};
  return ${JSX}
};
`;
    return {
      fileName: "modal.tsx",
      code: await prettierFormat(decrypt(hooks)),
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      fileName: "modal.tsx",
      code: String(error),
    };
  }
};
