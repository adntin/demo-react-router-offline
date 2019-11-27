# 实时离线，默默更新

1. 添加 /package.json 生产依赖包 workbox-window
2. 修改 /config/webpack.config.js 中 GenerateSW 构造参数
3. 添加 /src/service-worker.js 文件，用于默默请求`runtime`缓存，为了满足第一次加载后就可以缓存`index.html`
4. 修改 /src/index.js 入口文件
5. 添加 /public/offline.js 文件，用于处理`runtime`缓存作为 fallback，以及处理`public/*`添加到`precache`缓存

# TODO

1. http.js 被 Login.jsx 和 Home.jsx 引用，存在重复代码
