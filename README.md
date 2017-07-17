# 胶水phantomjs

## 特性

```
GET /api/screenshot?url={http://domain.com/}
```

```
GET /api/prerender?url={http://domain.com/}
```

## 代码结构

- /app 业务代码
  - /core.js 核心代码，启动 express，加载各种全局中间件逻辑，加载路由配置
  - /router.js 路由配置，调度请求给各个控制器和所需中间件
  - /controller 控制层
  - /middleware 中间件
  - /modal 模型层
  - /phantomjs_script 通用 phatnomjs 脚本
- /config 业务配置
- /server.js 启动服务，加载 app 代码，处理 net 模块

## 贡献代码

### 环境依赖

- NodeJS
- PhantomJS 不需要单独安装，phantomjs-prebuilt 模块在 npm install 的时候，会自动处理跨平台安装
- MySQL 用来存储业务数据

__注意__

phantomjs-prebuilt 没有处理字体相关问题，Linux 环境需要[手动安装中文字体](https://github.com/qq286735628/easyScreenshot/wiki/ubuntu-%E5%AE%89%E8%A3%85%E4%B8%AD%E6%96%87%E5%AD%97%E4%BD%93)

### 开发流程

- git clone
- npm install
- 开工
