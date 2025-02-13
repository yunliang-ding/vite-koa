# 拖拽逻辑

- Drag 组件的封装和使用 🌟🌟

  - 使用场景 Table，TableList，相关设计器拖拽

# 定义标准数据模型格式

- Form、Table、Tabs、Pages 等 🌟🌟

# 开发具体的设计器模版

- 基本提交表单、基本的CRUD、IPM表报

  - 源码管理 

    - 使用 CodeEditor 🌟
    - 基于 @shine/reactive，编写该模块的全局状态管理信息 🌟🌟

  - 预览

    - 保存之后带上相关id信息，新开一个窗口，具体渲染逻辑，引擎支持 🌟

  - 生成 jsonSchema

    - 将用户拖拽的组件，属性配置等，源码等，转为json支持预览 🌟
    - 保存的时候，需要 encodeURIComponent 之后存储

  - 拖拽物料模块

    - 基础物料库支持 antd/shineout，需要配置一堆.json文件，描述该物料的信息 🌟🌟

    - 同步IPM相关的业务组件和方法 🌟🌟🌟

  - 设计器区域

    - 按照定义的标准数据模型，编写相关可拖拽或设置属性的组件，可渲染和拖拽 🌟🌟🌟

  - 属性设置面板

    - 属性设置、变量和方法的绑定等实现 🌟🌟


# 核心点讲解

## monaco 相关 

  - 基于 @monaco-editor/loader + 集团的 CDN资源（https://assets.dotfashion.cn/unpkg/monaco-editor@0.52.0/min/vs） 🌟🌟

  - 使用 monaco-textmate、monaco-editor-textmate 集成 One Dark Pro/light-plus vsCode 主题 🌟🌟

  - 提供 CodeEditor 代码编辑器，基于 monaco 编辑器，，内部集成 excutecoder，并做了编译错误拦截错误提示等 🌟🌟🌟

  - 内置 prettierFormat 格式化，以及相关内部依赖 的 snippets 提示 🌟🌟🌟

## 将 JSONSchema 转 esModuleString

  - 提供 getEsModuleString API 将接口下发的 json 数据转为准数据模型，包括对绑定变量和方法的解析，最终获得 esModuleString 字符串 🌟🌟🌟

## 解析 esModuleString

  - 提供 excutecoder API 将得到的 esModuleString 字符串，解析成 __esModule 对象（底层基于 @babel/standalone 处理） 🌟🌟🌟🌟🌟

  - 这里会讲如何将内部的依赖的模块注入进去，以及如何集成 @shine/reactive 做状态管理 🌟🌟🌟🌟🌟

## 渲染引擎 Transcoder

  - 提供 Transcoder 组件，作为渲染引擎，传入相关id 🌟🌟

## 生成业务代码 
 
 - 提供 getBusinessFileCode API 传入相关id，即可生成相关业务代码 🌟🌟🌟🌟🌟
