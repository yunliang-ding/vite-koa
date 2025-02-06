import path from "path";
// import { visualizer } from "rollup-plugin-visualizer";

export default {
  // 配置选项
  resolve: {
    alias: {
      "@": path.resolve("./", "src"),
    },
  },
  // plugins: [
  //   // 放在所有插件最后
  //   visualizer({
  //     filename: "report.html",
  //     open: true,
  //     gzipSize: true,
  //     brotliSize: true,
  //   }),
  // ],
  build: {
    rollupOptions: {
      // 你不想打包进库的依赖
      // external: ["antd", "react", "react-dom"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖
        // 提供一个全局变量
        globals: {
          antd: "antd",
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
};
