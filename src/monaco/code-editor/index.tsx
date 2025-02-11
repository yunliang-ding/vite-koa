import { useEffect, useRef, useState } from "react";
import Monaco, { prettierFormat } from "../index";
import debounce from "lodash.debounce";
import { decrypt, encrypt, excutecoder } from "@/components/transcoder";
import { CodeEditorProps } from "./type";
import "./index.less";

export default ({
  value,
  defaultValue,
  onChange = () => {},
  style = { height: 300, width: 360 },
  defaultCode = "() => {}",
  debounceTime = 300,
  useEncrypt = true,
  theme = "vs",
}: CodeEditorProps) => {
  const innerValue = decrypt(value || defaultValue || defaultCode, false);
  const [errorInfo, setErrorInfo] = useState("");
  const valueRef = useRef(innerValue);
  useEffect(() => {
    valueRef.current = innerValue;
  }, [innerValue]);
  const codeRef: any = useRef({});
  useEffect(() => {
    // prettier 格式化代码
    codeRef.current.getMonacoInstance().then(async (instance: any) => {
      if (instance) {
        if (!instance.hasTextFocus?.() && innerValue) {
          instance.setValue?.(await prettierFormat(innerValue));
        }
      }
    });
  }, [innerValue]);
  return (
    <div className="code-editor-box" style={style}>
      {errorInfo && <div className="code-editor-box-error">{errorInfo}</div>}
      <Monaco
        theme={theme}
        codeRef={codeRef}
        value={innerValue}
        onChange={debounce(async (v: string) => {
          let codeString = v.trim();
          if (codeString.endsWith(";")) {
            codeString = v.substring(0, codeString.length - 1);
          }
          try {
            valueRef.current = codeString; // 同步文本
            excutecoder(codeString);
            // 语法校验通过才触发 onChange
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
