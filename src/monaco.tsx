import { useEffect, useMemo, useRef } from "react";
import loader from '@monaco-editor/loader';
import { loadVscodeTheme } from './wasm';

const hasLoadLanguage: any = [];

export default ({ value, onChange, language = "javascript" }: any) => {
  const codeRef: any = useRef({});
  const id = useMemo(() => `monaco_${Math.random()}`, []);
  const createInstance = (monaco: any) => {
    if (!document.getElementById(id)) {
      return;
    }
    const codeInstance = monaco.editor.create(
      document.getElementById(id),
      {
        theme: "vs-dark",
        language,
        selectOnLineNumbers: true,
        automaticLayout: true,
        tabSize: 2,
        fontSize: 12,
        fontWeight: "600",
        minimap: {
          enabled: false,
        },
        value,
      }
    );
    // onChange
    codeInstance.onDidChangeModelContent((e: any) => {
      const code = codeInstance.getValue();
      if (!e.isFlush) {
        onChange(code);
      }
    });
    return codeInstance;
  };
  // 加载资源
  const initialLoad = async () => {
    // 配置资源CDN
    loader.config({
      paths: {
        vs: 'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/monaco-editor/0.49.0/vs',
      },
    });
    return new Promise((res) => {
      loader.init().then((monaco: any) => {
        if (
          typeof (window as any).define === 'function' &&
          (window as any).define.amd
        ) {
          // make monaco-editor's loader work with webpack's umd loader
          // @see https://github.com/microsoft/monaco-editor/issues/2283
          delete (window as any).define.amd;
        }
        try {
          res(createInstance(monaco));
        } catch (error) {
          console.log(error);
        }
      });
    });
  };
  useEffect(() => {
    const monacoInstance = initialLoad();
    //  同步 window
    monacoInstance.then((editor: any) => {
      if(!hasLoadLanguage.includes(language)){
        loadVscodeTheme((window as any).monaco, editor, language); // 加载dark+、light+主题
        hasLoadLanguage.push(language);
      }
    });
    // 挂到 ref
    codeRef.current.getMonacoInstance = async () => {
      return monacoInstance;
    };
  }, []);
   // 更新值
   useEffect(() => {
    codeRef.current.getMonacoInstance().then((instance: any) => {
      if (instance) {
        if (!instance.hasTextFocus?.()) {
          instance.setValue?.(value);
        }
      }
    });
  }, [value]);
  return <div id={id} className="monaco-editor"></div>;
};