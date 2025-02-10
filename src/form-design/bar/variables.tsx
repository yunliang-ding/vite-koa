import Form from "@/components/pro/antd/form";
import CodeEditor from '@/monaco/code-editor';
import store from "../store";

export default () => {
  return (
    <Form
      widget={{ CodeEditor }}
      initialValues={{
        functions: store.mutate.functions,
      }}
      onValuesChange={(_, { functions }) => {
        console.log(functions);
      }}
      layout="vertical"
      schema={[
        {
          type: "TableList",
          name: "functions",
          label: "",
          props: {
            drag: false,
            scroll: {
              y: "calc(100vh - 300px)",
            },
            schema: [
              {
                label: "方法名",
                type: "Input",
                name: "functionName",
                width: 200,
                disabled: ({ system }: any) => {
                  return system === true
                },
                props: {
                  placeholder: "请输入方法名",
                }
              },
              {
                label: "代码",
                type: "CodeEditor",
                name: "functionCode",
                props: {
                  style: {
                    height: 80,
                    width: "100%"
                  }
                }
              },
            ],
            // 系统方法不可删除
            disabledDelete({ system }: any){
              return system === true 
            },
          },
        },
      ]}
    />
  );
};
