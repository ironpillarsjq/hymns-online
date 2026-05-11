## Context

当前项目 `public/data/` 下只有单一文件夹（如 `712/`），manifest.json 结构为：
```json
{ "siteTitle": "712", "folders": [...] }
```

需扩展为支持多个同层文件夹，每个文件夹独立成为浏览页面。

## Goals / Non-Goals

**Goals:**
- `public/data/` 下的多个子文件夹各自生成独立页面
- 每个页面保留现有一切浏览功能（列表/网格、分组、阅读器）
- 顶部导航栏可在所有站点间切换
- 新增简洁主页

**Non-Goals:**
- 不修改图片阅读器的翻页/预览/全屏逻辑
- 不修改目录页的列表/网格布局样式
- 不修改分组逻辑（10/100 规则）

## Decisions

### 1. Manifest 结构改为多站点数组

**选择**: 将 manifest 从 `{ siteTitle, folders }` 改为：
```json
{
  "sites": [
    { "name": "712", "title": "712", "path": "data/712", "folders": [...] },
    { "name": "853", "title": "853", "path": "data/853", "folders": [...] }
  ]
}
```

每个 site 有 `name`（用于路由）、`title`（页面标题和导航栏显示名）、`path`（数据路径，图片 URL 前缀）和 `folders`（子文件夹列表）。

**备选**: 保留旧格式 + 新增 `sites` 数组双存 — 冗余且增加维护负担，新格式更清晰。

### 2. 路由设计

**选择**: 使用带参数的站点路由 `/site/:siteName`，主页为 `/`。

```
/                   → HomePage
/site/:siteName     → TocPage (siteName = "712", "853", ...)
/viewer?folder=...  → ViewerPage (不变)
```

`siteName` 对应 manifest 中 site 的 `name` 字段，TocPage 通过 `route.params.siteName` 筛选数据。

**备选**: 每个站点独立路由 `/712`, `/853` — 站点数量动态变化时无法动态注册路由，还需额外解决路由冲突。

### 3. 导航栏实现

**选择**: NavBar 作为全局组件放在 `App.vue` 的 `<router-view>` 上方，固定于页面顶部。渲染逻辑：
1. 从 manifest 读取所有 `sites[].name` 和 `sites[].title`
2. 显示为横向排列的链接
3. 最左侧为"主页"链接
4. 当前页面链接高亮

### 4. 配置文件

**选择**: `public/config.json` 定义主页文本，结构简洁：
```json
{
  "homeTitle": "诗歌",
  "homeSubtitle": "一切景语皆情语"
}
```

文件放在 `public/` 目录，Vite 自动拷贝到构建输出。

### 5. 插件修改

插件 `configureServer` 中间件和 `generateBundle` 中，将遍历 `public/data/` 下所有子目录（而非仅第一个），为每个生成 site 对象。

## Risks / Trade-offs

- **[Risk] 数据结构变更影响现有代码** — TocPage 和 ViewerPage 需要适配新 manifest 格式。Mitigation: 两处改动范围小，从 `manifest.folders` 改为按 `manifest.sites[].folders` 查找。
- **[Risk] 站点名含特殊字符** — 中文文件夹名（如"附录"）用作 URL 参数。Mitigation: 使用 `encodeURIComponent` 编码路由参数，确保兼容性。
