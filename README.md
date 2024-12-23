## 初始化

- npm create vite@latest . -- --template react-ts

## 添加 koa 相关依赖

```json
{
  "koa": "2.15.3",
  "koa-router": "13.0.1",
  "koa-connect": "2.1.0",
  "koa-bodyparser": "4.4.1",
  "chalk": "5.4.0",
  "fs-extra": "11.2.0",
  "glob": "11.0.0"
}
```

## 安装依赖

- pnpm i

## 创建脚本 vite-koa.js

- * 删除 vite 默认的配置文件

- 创建 koa 服务 集成 viteServer

```js
const app = new Koa();

const router = new Router();

app.use(bodyParser()); // 获取 post参数 ctx.request.body

router.get("/", async (ctx) => {
  ctx.type = "text/html";
  ctx.body = fs.readFileSync("index.html", "utf-8");
});

// 使用路由中间件
app.use(router.routes());

// 创建 vite 服务
const viteServer = await createServer({
  server: {
    middlewareMode: {
      // 提供父 http 服务器以代理 WebSocket
      server: app,
    },
  }
});

// 使用 vite middleware
app.use(connect(viteServer.middlewares));
```

- 约定式 api 路由，解析 src/apis 目录

```js
// api文件路由
const createServerFileApiRouter = (router) => {
  const folder = `${path.resolve()}/src/apis/**/*.mjs`;
  const files = glob.sync(folder);
  files.forEach(async (filePath) => {
    const prefix = filePath
      .substring(filePath.lastIndexOf("/") + 1)
      .replace(".mjs", ""); // 文件名
    const module = await import(filePath); // 解析文件
    Object.keys(module).forEach((key) => {
      const apiPath = module[key].config?.apiPath; // 是否有自定义路径
      const controller = apiPath ? apiPath : `/${prefix}/${key}`;
      router.get(controller, module[key]); // 添加 get
      router.post(controller, module[key]); // 添加 post
    });
  });
};
```

## 编写 CRUD 接口

- 创建 src/apis/user.mjs

```js
const userList = [];
const uuid = () => Math.random().toString(16).substring(2, 10);
/**
 * 新增
 * @param {*} ctx 
 */
export const add = async (ctx) => {
  const { name, age } = ctx.request.body;
  userList.unshift({
    id: uuid(),
    name,
    age,
  });
  ctx.type = "application/json";
  ctx.body = {
    code: 200,
  };
};
/**
 * 删除
 * @param {*} ctx 
 */
export const remove = async (ctx) => {
  const { id } = ctx.params;
  const index = userList.findIndex((item) => item.id === id);
  userList.splice(index, 1);
  ctx.type = "application/json";
  ctx.body = {
    code: 200,
  };
};
// 自定义接口路径
remove.config = {
  apiPath: "/user/remove/:id",
}
/**
 * 更新
 * @param {*} ctx 
 */
export const update = async (ctx) => {
  const { id, name, age } = ctx.request.body;
  const item = userList.find((item) => item.id === id);
  Object.assign(item, {
    name,
    age
  })
  ctx.type = "application/json";
  ctx.body = {
    code: 200,
  };
};
/**
 * 查询
 * @param {*} ctx 
 */
export const list = async (ctx) => {
  ctx.type = "application/json";
  ctx.body = {
    code: 200,
    data: userList,
  };
};
```

## 启动项目

- npm start

## 总结和思考

- 在开发环境 通过 vite 的 createServer Api 获取 server 实例，集合 koa-connect 搭配使用，可以在 vite 启动服务的同时也支持了 koa-router 创建的接口服务

- 通过 `await import(filePath)` 解析模块，之后添加到 router 配置上，我们在方法名上配置的config属性，可以定制化路径等。这里是否可以通过 ts 的注解模式更加友好，demo 如下

```js
export default class User{
  @post("/user/remove/:id")
  async remove(ctx){
    // ctx.params.id
  },
  @get("/user/list")
  async list(ctx){
  }
}
```
- 是否可以通过 vite 插件实现?

- 打包的处理?