import prettier from "prettier";
import typescript from "prettier/plugins/typescript";
import prettierPluginEstree from "prettier/plugins/estree";

const parserObjectToString = (obj: any) => {
  const str: any = [];
  Object.keys(obj).forEach(key => {
    console.log(typeof obj[key]);
    if(['function'].includes(typeof obj[key])){
      str.push(`${key} = {${obj[key]}}`);
    } else if(['object'].includes(typeof obj[key])){
      str.push(`${key} = {${JSON.stringify(obj[key])}}`);
    } else {
      str.push(`${key} = "${obj[key]}"`);
    }
  });
  return str.join(" ")
}

export default async (code: string) => {
  try {
    const data = new Function(`return ${code.replace("export default", "")}`)();
    console.log(data)
    const str = `import React from "react";
import { Form, Row, Col } from "antd";

export default () => {
  const [form] = Form.useForm();
  return  <div className="card-form" style={{width: ${data.width}}}>
    <p>${data.title}</p>
    <Form from={form}>
      <Row gutter={12}>
      ${data.items
        .map((item: any) => {
          return `<Col span={${item.span ? item.span : 24 / (data.column || 1)}}>
        <Form.Item label="${item.label}" name="${item.name}">
          <${item.componentType} ${parserObjectToString(item.props)} />
        </Form.Item>
      </Col>`;
        })
        .join("\n")}
      </Row>
    </Form>
  </div>
};
`;
    return await prettier.format(str, {
      parser: "typescript",
      plugins: [typescript, prettierPluginEstree],
    });
  } catch (error) {
    return String(error);
  }
};
