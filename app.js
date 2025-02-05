import Koa from "koa";
import connect from "koa-connect";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { createServer } from "vite";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import * as glob from "glob";

// api文件路由
const createServerFileApiRouter = (router) => {
  const folder = `${path.resolve()}/src/api/**/*.mjs`;
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

const app = new Koa();

const router = new Router();

app.use(bodyParser());

router.get("/", async (ctx) => {
  ctx.type = "text/html";
  ctx.body = fs.readFileSync("index.html", "utf-8");
});

// 文件接口路由
createServerFileApiRouter(router);

// 使用路由中间件
app.use(router.routes());

// 创建 vite 服务
const vite = await createServer({
  server: {
    middlewareMode: {
      // 提供父 http 服务器以代理 WebSocket
      server: app,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve("./", "src"),
    },
  },
});
// 使用 vite middleware
app.use(connect(vite.middlewares));

app.listen(3000, async () => {
  console.log("\t");
  console.log("> vite-project dev");
  console.log("> koa + vite");
  console.log("\n");
  console.log(
    chalk.green("   KOAVITE v0.0.1 "),
    chalk.gray("ready in "),
    "92 ms"
  );
  console.log("\t");
  console.log(
    chalk.green("   ➜"),
    " Local: ",
    chalk.cyanBright("http://localhost:3000")
  );
});
