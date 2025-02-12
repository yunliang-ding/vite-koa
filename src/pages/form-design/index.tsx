import FormDesign from "../../form-design";

export default () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <FormDesign
        stateCode={
          "export const store = create({\n  /** 是否可见 */\n  visible: false,\n  /** 标题 */\n  title: \"基本信息提交\",\n});\n\n/** 组件渲染完成 */\nexport const init = async () => {\n  console.log(\"组件渲染完成的生命周期\");\n  await new Promise((res) => setTimeout(res, 1000));\n  store.mutate.options = [\n    {\n      label: \"异步查询数据\",\n      value: 1,\n    },\n  ];\n};\n/** 组件卸载 */\nexport const destroy = async () => {\n  console.log(\"组件卸载生命周期\");\n};\n\n/** 表单提交 */\nexport const onSubmit = async (values) => {\n  try {\n    await new Promise((res) => setTimeout(res, 1000));\n    alert(\n      JSON.stringify({\n        ...values,\n        // date: moment(values.date).format(\"YYYY-MM-DD\"),\n      }),\n    );\n    Antd.message.success(\"已提交！\");\n    store.mutate.title = \"已提交了\";\n  } catch (error) {\n    console.log(error);\n  }\n}"
        }
        code={`{
          "type": "Form",
          "title": "{{title}}",
          "layout": "vertical",
          "selectKey": "022cd1771d",
          "column": 3,
          "schema": [
            {
              "type": "Select",
              "label": "下拉选",
              "props": {
                "placeholder": "请选择",
                "allowClear": true,
                "options": [
                  { "label": "选项1", "value": 1 },
                  { "label": "选项2", "value": 2 },
                  { "label": "选项3", "value": 3 }
                ],
                "onChange": "#_#(v) => {  store.mutate.visible = v === 2}#_#"
              },
              "key": "022cd1771d",
              "name": "022cd1771d"
            },
            {
              "type": "DatePicker",
              "label": "日期框",
              "props": { "placeholder": "请选择", "allowClear": true },
              "key": "32571396cf",
              "name": "date",
              "visible": "#_#() => {  return store.snap.visible}#_#"
            },
            {
              "type": "Input",
              "label": "单行文本",
              "props": { "placeholder": "请输入", "allowClear": true },
              "key": "9c44544011",
              "name": "9c44544011"
            }
          ],
          "okText": "提交",
          "onSubmit": "{{onSubmit}}"
        }
        `}
      />
    </div>
  );
};
