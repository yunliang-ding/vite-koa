import FormDesign from "../../form-design";

export default () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <FormDesign
        stateCode={"export default create({\n  visible: false,\n  title: \"提交表单\",\n  // 定义选项\n  options: [],\n  // 初始化会调用该方法\n  async init() {\n    await new Promise((res) => setTimeout(res, 1000));\n    this.options = [\n      {\n        label: \"异步查询数据\",\n        value: 1,\n      },\n    ];\n    console.log(\"初始化会调用该方法12\", this);\n  },\n  // 接口提交\n  async onSubmit(values) {\n    try {\n      await axios.post(\"/user/add\", {\n        ...values,\n        // date: moment(values.date).format(\"YYYY-MM-DD\"),\n      });\n      Antd.message.success(\"已提交！\");\n      this.title = \"已提交了\";\n    } catch (error) {\n      console.log(error);\n    }\n  },\n});"}
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
              "visible": "#_#() => {  return store.mutate.visible}#_#"
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
