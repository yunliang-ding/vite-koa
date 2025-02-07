import { useEffect, useRef, useState } from "react";
import { isEmpty } from "@/components/shared";
import Monaco, { prettierFormat } from "@/monaco";
import debounce from "lodash.debounce";
import { decrypt, encrypt, excutecoder } from "@/transcoder";
import "./index.less";

export default ({
  value,
  onChange = () => {},
  style = { height: 300, width: 360 },
  defaultCode = "() => {}",
  noChangeClearCode = false,
  useEncrypt = true,
  debounceTime = 300,
}: any) => {
  const [errorInfo, setErrorInfo] = useState("");
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  const codeRef: any = useRef({});
  useEffect(() => {
    // 格式化代码
    if(useEncrypt){
      codeRef.current.getMonacoInstance().then(async (instance: any) => {
        if (instance) {
          if (!instance.hasTextFocus?.() && value) {
            instance.setValue?.(await prettierFormat(decrypt(value, false)));
          }
        }
      });
    }
  }, [value]);
  return (
    <div className="function-data-box" style={style}>
      {errorInfo && <div className="function-data-error-info">{errorInfo}</div>}
      <Monaco
        theme="vs"
        codeRef={codeRef}
        value={decrypt(value, false) || defaultCode}
        onChange={debounce(async (v: string) => {
          const codeString = v.substring(0, v.lastIndexOf("}")); // 编辑器要求函数必须是以 } 结尾
          try {
            if (
              isEmpty(codeString) ||
              (codeString === defaultCode && noChangeClearCode)
            ) {
              setErrorInfo("");
              return onChange(undefined);
            }
            valueRef.current = codeString; // 同步文本
            excutecoder(codeString, []);
            // 校验通过才触发 onChange
            onChange(useEncrypt ? encrypt(codeString) : codeString);
            setErrorInfo("");
          } catch (error) {
            setErrorInfo(String(error));
          }
        }, debounceTime)}
      />
    </div>
  );
};
