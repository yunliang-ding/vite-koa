import prettier from "prettier";
import typescript from "prettier/plugins/typescript";
import prettierPluginEstree from "prettier/plugins/estree";

export const encrypt = (str: string) => {
  return `{{_#${str}_#}}`;
};

export const decrypt = (str: string, quotation = true) => {
  if (quotation) {
    return str?.replaceAll('"{{_#', '{').replaceAll('_#}}"', '}');
  }
  return str?.replaceAll('{{_#', '{').replaceAll('_#}}', '}');
};

function parseTemplate(template: string, storeDep: any) {
  if (typeof template === "string") {
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      storeDep.push(key); // 收集到store
      return encrypt(key); // 批量替换
    });
  }
  return template
}

const parserObjectToString = (obj: any, storeDep: any) => {
  const str: any = [];
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .forEach((key) => {
      if (["function"].includes(typeof obj[key])) {
        str.push(`${key} = {${parseTemplate(obj[key].toString(), storeDep)}}`);
      } else if (["object"].includes(typeof obj[key])) {
        str.push(`${key} = {${parseTemplate(JSON.stringify(obj[key]), storeDep)}}`);
      } else {
        str.push(`${key} = "${parseTemplate(obj[key], storeDep)}"`);
      }
    });
  return str.join(" ");
};

export default async (code: string) => {
  try {
    const data = new Function(`return ${code.replace("export default", "")}`)();
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
      onOk={submit}
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
import { sendPost } from "cpx/public";
${widgetDep.length > 0 ? ['import {', widgetDep.join(', '), '} from "cpx/material"'].join("") : null};
import store from "./store";

export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  ${storeDep.length > 0 ? ["const {", storeDep.join(', '), "} = store.useStore()"].join("") : ""}
  ${data.apiCallBack ? ["const apiCallBack = ", data.apiCallBack.toString()].join("") : ""};
  ${data.transformValues ? ["const transformValues = ", data.transformValues.toString()].join("") : ""}
  const submit = async () => {
    const values = await form.validateFields();
    setLoading(true);
    await sendPost({
      url: "${data.api}",
      params: ${data.transformValues ? "transformValues(values)" + "" : "values"},
    });
    setLoading(false);
    ${data.apiCallBack && "apiCallBack()"}
  }
  ${data.useEffect && ["useEffect(", data.useEffect.toString(), ", [])"].join("")};
  return ${JSX}
};
`;
    return await prettier.format(decrypt(hooks), {
      parser: "typescript",
      plugins: [typescript, prettierPluginEstree],
    });
  } catch (error) {
    return String(error);
  }
};
