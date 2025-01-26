import { LoadingOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Spin } from "antd";
import { useState } from "react";
import "./index.less";

interface ProButton extends ButtonProps {
  /** 二次提示 */
  confirm?: string;
  /** 内容 */
  label?: string;
}

export default ({
  children,
  confirm,
  label,
  onClick = () => null,
  ...rest
}: ProButton) => {
  const [loading, setLoading] = useState(false);
  const onProClick = async (e: any) => {
    try {
      setLoading(true);
      await onClick(e);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Spin
      spinning={loading}
      wrapperClassName="ant-btn-spin"
      size="small"
      indicator={<LoadingOutlined />}
    >
      <Button {...rest} onClick={onProClick}>
        {children || label}
      </Button>
    </Spin>
  );
};
