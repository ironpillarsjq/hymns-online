## 1. 配置文件与数据层

- [x] 1.1 创建 `public/config.json`，定义 `homeTitle` 和 `homeSubtitle` 字段
- [x] 1.2 修改 `vite-plugin-image-manifest.js`：遍历 `public/data/` 下所有子目录，为每个生成 `{ name, title, path, folders }` 的 site 对象，manifest 改为 `{ sites: [...] }` 格式

## 2. 路由

- [x] 2.1 新增主页路由 `/` → `HomePage.vue`
- [x] 2.2 新增站点路由 `/site/:siteName` → `TocPage.vue`
- [x] 2.3 保留阅读器路由 `/viewer` → `ViewerPage.vue`（结构不变）

## 3. 导航栏

- [x] 3.1 创建 `src/components/NavBar.vue` 组件，从 manifest 读取站点列表，渲染"主页" + 所有站点名称链接
- [x] 3.2 当前路由对应站点链接高亮

## 4. 主页

- [x] 4.1 创建 `src/views/HomePage.vue`，加载 `public/home.svg`，通过 DOMParser 将 config.json 的 `homeTitle` 和 `homeSubtitle` 注入 SVG 文本元素后渲染

## 5. 目录页适配

- [x] 5.1 修改 `TocPage.vue`：从 `route.params.siteName` 获取站点参数，从 manifest 的 `sites` 数组中查找匹配站点，显示其 `folders`
- [x] 5.2 页面标题设为对应站点的 `title`

## 6. 阅读器适配

- [x] 6.1 修改 `ViewerPage.vue`：适配新 manifest 结构，从 `sites` 数组中查找图片路径（folder path 已含站点前缀 `data/712/001`，现有逻辑不变）

## 7. 根组件集成

- [x] 7.1 在 `App.vue` 中将 `NavBar` 置于 `<router-view>` 上方，阅读器页面（viewer）隐藏 NavBar
- [x] 7.2 NavBar 改为浅灰色配色（`var(--color-light)` 背景 + `var(--color-text)` 文字），当前页高亮使用 `var(--color-primary)` 背景

## 8. 阅读器返回站点

- [x] 8.1 修改 `ViewerPage.vue` `goBack()`：从 folder 路径提取站点名（如 `data/712/001` → `712`），导航至对应的 `/site/:siteName`
- [x] 8.2 退出提示的退出操作和"目录"按钮点击均通过 `goBack()` 返回对应站点目录页
