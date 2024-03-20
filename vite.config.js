import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  //代理http请求，解决跨域问题
  server: {
    // host: '192.168.0.66',
    // 前端地址
    host: "localhost",
    port: 5173,
    proxy: {
            '/api': { //匹配请求路径中含有 /api 的请求
                // target: 'http://47.115.226.138:8080', //后端服务地址
                target: 'http://localhost:8080', //后端服务地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), //去除路径中的/api，还原请求路径
      },
    },
  },
});
