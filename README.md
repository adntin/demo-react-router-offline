# 实时离线，默默更新

1. 添加 /package.json 生产依赖包 workbox-window
2. 修改 /config/webpack.config.js 中 GenerateSW 构造参数
3. 添加 /src/sw.js 文件
4. 修改 /src/index.js 入口文件

# TODO

1. http.js 被 Login.jsx 和 Home.jsx 引用，存在重复代码
