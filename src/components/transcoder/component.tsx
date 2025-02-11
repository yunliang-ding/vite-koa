import ProForm from "../pro/antd/form";
import ProTable from "../pro/antd/table";

export default ({ type, ...rest }: any) => {
  if (type === "Form") {
    return <ProForm {...rest} />;
  }
  if (type === "Table") {
    return <ProTable {...rest} />;
  }
  return (
    <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
      渲染异常，找不到类型 {type}
    </pre>
  );
};