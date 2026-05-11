## Why

当前项目仅支持 `public/data/` 下单一文件夹，当用户有多个诗歌集合（如不同卷号、附录等）时需拆分多个部署。扩展为多文件夹支持可在一个站点内管理多个诗集，通过顶部导航栏便捷切换。

## What Changes

- **BREAKING**: manifest.json 结构从单站点 `{ siteTitle, folders }` 改为多站点 `{ sites: [{ name, title, folders }] }`
- 支持 `public/data/` 下多个子文件夹，每个子文件夹独立生成一个浏览页面
- 每个子文件夹页面的浏览功能与现有功能完全一致
- 所有页面顶部新增导航栏，列出所有文件夹名称和"主页"链接
- 新增主页，显示简短标题和配置文件中的副标题
- 新增 `public/config.json` 配置文件，定义主页副标题文本
- 路由新增主页路由（`/`）和站点路由（`/site/:siteName`）
- TocPage 改为根据路由参数加载对应站点的子文件夹列表

## Capabilities

### New Capabilities

- `multi-folder-support`: 支持 `public/data/` 下多个子文件夹作为独立浏览页面，每个文件夹页面功能与现有图片浏览一致
- `top-navbar`: 所有页面顶部显示导航栏，包含主页链接和所有站点名称，点击可跳转
- `home-page`: 简洁主页，显示标题和来自配置文件的副标题

### Modified Capabilities

- `toc-browsing`: TocPage 从"总是加载唯一站点"改为"根据路由参数加载指定站点"
- `image-data-source`: 数据源 manifest 结构从单站点改为多站点数组

## Impact

- `vite-plugin-image-manifest.js` — manifest 生成逻辑重构为多站点格式
- `src/router/index.js` — 新增主页路由 `/` 和站点路由 `/site/:siteName`
- `src/views/TocPage.vue` — 按路由参数筛选站点数据
- `src/views/ViewerPage.vue` — 适配新 manifest 查找逻辑
- 新增 `src/views/HomePage.vue` — 主页组件
- 新增 `src/components/NavBar.vue` — 顶部导航栏组件
- `src/App.vue` — 引入 NavBar
- 新增 `public/config.json` — 配置文件
