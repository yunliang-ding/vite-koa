import { useEffect, useRef, useState } from "react";
import Monaco, { prettierFormat } from "../index";
import debounce from "lodash.debounce";
import { decrypt, encrypt, excutecoder } from "@/transcoder";
import { CodeEditorProps } from "./type";
import "./index.less";

export default ({
  value,
  defaultValue,
  onChange = () => {},
  style = { height: 300, width: 360 },
  defaultCode = "() => {}",
  dependencies = [],
  useEncrypt = true,
  debounceTime = 300,
  theme = 'vs'
}: CodeEditorProps) => {
  const innerValue = value || defaultValue || defaultCode;
  const [errorInfo, setErrorInfo] = useState("");
  const valueRef = useRef(innerValue);
  useEffect(() => {
    valueRef.current = innerValue;
  }, [innerValue]);
  const codeRef: any = useRef({});
  useEffect(() => {
    // 格式化代码
    if (useEncrypt) {
      codeRef.current.getMonacoInstance().then(async (instance: any) => {
        if (instance) {
          if (!instance.hasTextFocus?.() && innerValue) {
            instance.setValue?.(await prettierFormat(decrypt(innerValue, false)));
          }
        }
      });
    }
  }, [innerValue]);
  return (
    <div className="code-editor-box" style={style}>
      {errorInfo && <div className="code-editor-box-error">{errorInfo}</div>}
      <Monaco
        theme={theme}
        codeRef={codeRef}
        value={decrypt(innerValue, false)}
        onChange={debounce(async (v: string) => {
          const codeString = v.substring(0, v.lastIndexOf("}") + 1); // 编辑器要求函数必须是以 } 结尾
          try {
            valueRef.current = codeString; // 同步文本
            const res = excutecoder(codeString, dependencies);
            // 校验通过才触发 onChange
            onChange(useEncrypt ? encrypt(codeString) : codeString, res);
            setErrorInfo("");
          } catch (error) {
            setErrorInfo(String(error));
          }
        }, debounceTime)}
      />
    </div>
  );
};
