import { Button } from "antd";
import Drag from "../components/material/drag";
import material from "./material-config";

export default () => {
  return (
    <div className="sider">
      <Drag
        accept={false}
        items={Object.keys(material).map((key: string) => {
          return {
            key,
            schema: material[key],
            content: <Button>{key}</Button>,
          };
        })}
      />
    </div>
  );
};
