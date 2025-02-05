import Sider from "./sider";
import Canvas from "./canvas";
import Panel from "./panel";
import "./index.less";

export default () => {
  return (
    <div className="form-design">
      <Sider />
      <Canvas />
      <Panel />
    </div>
  );
};
