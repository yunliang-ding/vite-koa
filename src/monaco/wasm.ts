import { wireTmGrammars } from 'monaco-editor-textmate';
import { loadWASM } from 'onigasm';
import { Registry } from 'monaco-textmate';
import darkPlus from './one-dark-pro.json';
import lightPlus from './one-light-pro.json';

const covertTheme = (theme: any, addDefaultToken = true, defaultColor = '#ffffff') => {
  if (typeof theme === 'string') {
    theme = JSON.parse(
      theme.replace(/(\/\/").+?[\n\r\t]/g, '').replace(/,[\n\r\t]*\}/, '}'),
    );
  }
  const monacoThemeRule: { token: string; foreground: any; }[] = [];
  const returnTheme = {
    inherit: false,
    base: theme.type === 'light' ? "vs" : "vs-dark",
    colors: theme.colors,
    rules: monacoThemeRule,
    encodedTokensColors: [],
  };
  theme.tokenColors.map((color: { scope: any; settings: any; }) => {
    function evalAsArray() {
      if (color.scope) {
        color.scope.map((scope: any) => {
          monacoThemeRule.push(
            Object.assign({}, color.settings, {
              token: scope,
            }),
          );
        });
      }
    }
    if (typeof color.scope == 'string') {
      const split = color.scope.split(',');
      if (split.length > 1) {
        color.scope = split;
        evalAsArray();
        return;
      }
      monacoThemeRule.push(
        Object.assign({}, color.settings, {
          token: color.scope,
        }),
      );
      return;
    }
    evalAsArray();
  });
  if (addDefaultToken) {
    monacoThemeRule.push({
      token: '',
      foreground: theme.colors['editor.foreground'] || defaultColor,
    });
  }
  return returnTheme;
};

const OssUrl = 'https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/monaco';

let hasLoadOnigasm = false;

const grammarsCache: any = {};

export const loadVscodeTheme = async (monaco: { languages: { register: (arg0: { id: any; }) => void; }; editor: { defineTheme: (arg0: string, arg1: { inherit: boolean; base: string; colors: any; rules: { token: string; foreground: any; }[]; encodedTokensColors: never[]; }) => void; }; }, editor: any, language: string | number) => {
  // 加载onigasm的WebAssembly文件
  if (!hasLoadOnigasm) {
    hasLoadOnigasm = true;
    await loadWASM(`${OssUrl}/onigasm/onigasm.wasm`);
  }
  const grammars = new Map();
  grammars.set(
    language,
    {
      css: 'source.css',
      html: 'text.html.basic',
      json: 'source.json',
      less: 'source.css.less',
      typescript: 'source.ts',
      javascript: 'source.js',
      // typescriptreact: 'source.ts.tsx',
      // javascriptreact: 'source.js.jsx',
    }[language],
  );
  // 创建一个注册表，可以从作用域名称创建语法
  const registry = new Registry({
    getGrammarDefinition: async (scopeName: string) => {
      const path: any = {
        'text.html.basic': 'html.tmLanguage.json',
        'source.css': 'css.tmLanguage.json',
        'source.css.less': 'less.tmLanguage.json',
        'source.json': 'JSON.tmLanguage.json',
        'source.ts': 'TypeScript.tmLanguage.json',
        'source.js': 'JavaScript.tmLanguage.json',
        // 'source.js.jsx': 'JavaScriptReact.tmLanguage.json',
        // 'source.ts.tsx': 'TypeScriptReact.tmLanguage.json',
      }[scopeName];
      let content = grammarsCache[path];
      if (content === undefined) {
        grammarsCache[path] = await (
          await fetch(`${OssUrl}/grammars/${path}`)
        ).text();
        content = grammarsCache[path];
      }
      return path
        ? {
            format: 'json',
            content,
          }
        : null;
    },
  } as any);
  // 注册
  monaco.languages.register({ id: language });
  // 重新覆盖主题
  monaco.editor.defineTheme('vs-dark', covertTheme(darkPlus));
  // 重新覆盖主题
  monaco.editor.defineTheme('vs', covertTheme(lightPlus));
  setTimeout(() => {
    wireTmGrammars(window.monaco, registry, grammars, editor);
  }, 100);
};
