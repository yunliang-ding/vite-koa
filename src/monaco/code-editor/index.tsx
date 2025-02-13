import { useEffect, useRef, useState } from "react";
import Monaco from "../index";
import debounce from "lodash.debounce";
import { decrypt, encrypt, EsModuleString, excutecoder } from "@/components/transcoder";
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
  return (
    <div className="code-editor-box" style={style}>
      {errorInfo && <div className="code-editor-box-error">{errorInfo}</div>}
      <Monaco
        theme={theme}
        codeRef={codeRef}
        value={innerValue}
        onChange={debounce(async (v) => {
          let codeString = v.trim();
          if (codeString.endsWith(";")) {
            codeString = v.substring(0, codeString.length - 1);
          }
          try {
            if (codeString.includes("<%")) {
              return setErrorInfo("不能含有特殊字符<%");
            }
            if (codeString.includes("%>")) {
              return setErrorInfo("不能含有特殊字符%>");
            }
            valueRef.current = codeString; // 同步文本
            const esModule = excutecoder(codeString as EsModuleString); // 语法校验通过才触发 onChange
            onChange(useEncrypt ? encrypt(codeString) : codeString, esModule);
            setErrorInfo("");
          } catch (error) {
            setErrorInfo(String(error));
          }
        }, debounceTime)}
      />
    </div>
  );
};
