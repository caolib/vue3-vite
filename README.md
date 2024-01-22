# vue-project

> 简介：图书借阅管理系统前端开发，使用vue3框架

## 项目使用的相关技术和框架

|    相关技术    |        功能         |
| :------------: | :-----------------: |
|      vue3      |    项目前端框架     |
|     axios      |     http请求库      |
|  element-plus  |     页面组件库      |
| pinia、persist | vue存储库和状态管理 |
|   vue-router   |      页面路由       |
|     nodejs     |    模块依赖管理     |
|      vite      |   前端构建工具链    |

## 快速使用

### 1.进入项目根目录，使用npm命令下载项目所需的依赖模块

**注意：要先安装nodejs，最好以管理员身份执行命令！！！**

```cmd
npm install
```

### 2.修改配置文件

打开`vite.config.js`文件,可以自行修改前端地址，也可以修改向后端请求的地址，但是要相应地修改后端项目的启动路径

```js
//代理http请求，解决跨域问题
server: {
    // 前端项目启动路径，localhost:5173
    host: 'localhost',
    port: 5173,
    proxy: {
        '/api': { //匹配请求路径中含有 /api 的请求
            target: 'http://localhost:8080', //后端服务地址
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '') //去除路径中的/api，还原请求路径
        }
    }
},
```

### 3.执行命令，启动项目

```cmd
npm run dev
```

## 项目目录结构

- `components`：公共组件，包括顶部导航和侧栏
- `css`：全局样式
- `methods`：前端所有向后端发送的请求api
- `router`：界面路由
- `stores`：pinia存储
- `util`：工具方法
- `views`：页面
- `main.js`：入口文件，app的初始化
- `package.json`：项目的各种依赖，执行脚本等
- `vite.config.js`：项目配置文件
