import { createStore } from "resy";
import Monaco from "./monaco";
import transcoder from "./transcoder";
import { useEffect } from "react";

const source = `export default {
  title: "基础表单",
  width: 600,
  items: [{
    componentType: "Input",
    label: "用户名",
    name: "userName",
    required: true,
    props: {
      maxLength: 100,
      onChange: (v) => {
        console.log(v)
      }
    }
  }, {
    componentType: "Select",
    label: "职位",
    name: "position",
    required: true,
    props: {
      options: [{
        label: "选项1",
        value: 0
      }, {
        label: "选项2",
        value: 1
      }]
    }
  }, {
    componentType: "TextArea",
    label: "备注",
    name: "remark",
    required: true,
    props: {
      maxLength: 100,
    }
  }],
  api: "/ipm/user/save",
  apiMethod: "POST",
  apiCallBack: () => {
    message.success("提交成功");
  },
  transformValues: (initialValues) => {
    return {
      ...initialValues,
      position: initialValues.position.split(",")
    }
  },
}`;

const store = createStore<{
  source: string;
  target: string;
}>({
  source,
  target: ""
});

export default () => {
  const { source, target } = store.useStore();
  useEffect(() => {
    (async () => {
      store.target = await transcoder(source);
    })()
  }, [source])
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Monaco
        value={source}
        onChange={async (v: string) => {
          store.source = v;
        }}
      />
      <Monaco value={target} />
    </div>
  );
};
