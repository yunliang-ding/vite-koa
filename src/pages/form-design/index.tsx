import FormDesign from "../../form-design";

export default () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <FormDesign
        jsonSchema={`{
          "type": "Form",
          "title": "默认标题",
          "layout": "vertical",
          "selectKey": "32571396cf",
          "column": 3,
          "schema": [
            {
              "type": "DatePicker",
              "label": "日期框",
              "props": {
                "placeholder": "请选择",
                "allowClear": true
              },
              "key": "32571396cf",
              "name": "32571396cf"
            },
            {
              "type": "Select",
              "label": "下拉选",
              "props": {
                "placeholder": "请选择",
                "allowClear": true,
                "options": [
                  {
                    "label": "选项1",
                    "value": 1
                  },
                  {
                    "label": "选项2",
                    "value": 2
                  },
                  {
                    "label": "选项3",
                    "value": 3
                  }
                ]
              },
              "key": "022cd1771d",
              "name": "022cd1771d"
            },
            {
              "type": "Input",
              "label": "单行文本",
              "props": {
                "placeholder": "请输入",
                "allowClear": true
              },
              "key": "9c44544011",
              "name": "9c44544011"
            }
          ],
          "okText": "提交",
          "onSubmit": "{{onSubmit}}"
        }`}
      />
    </div>
  );
};
