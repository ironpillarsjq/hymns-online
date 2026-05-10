## 1. 项目初始化与路由配置

- [x] 1.1 添加 `vue-router` 依赖到 `package.json`
- [x] 1.2 创建 `src/router/index.js`，配置 hash 模式路由（`/` → TocPage，`/viewer/:encodedPath` → PdfViewerPage）
- [x] 1.3 更新 `src/main.js`，注册 router
- [x] 1.4 更新 `App.vue`，移除默认模板内容，替换为 `<router-view />`
- [x] 1.5 更新 `index.html` 的 `<title>` 为动态标题（或默认标题）
- [x] 1.6 删除默认脚手架组件（`HelloWorld.vue`、`TheWelcome.vue`、`WelcomeItem.vue`、`icons/`）

## 2. 数据管道（Vite 插件 + Manifest）

- [x] 2.1 创建 `vite-plugin-pdf-manifest.js`，实现 buildStart/closeBundle 钩子
- [x] 2.2 实现 `/public/data/` 目录扫描，发现所有 `public/data/<网站标题>/*.pdf` 文件
- [x] 2.3 实现 `manifest.json` 生成并输出到 `dist/data/manifest.json`，包含 `siteTitle` 和 `pdfs` 数组（含 `fileName`、`displayName`、`path`）
- [x] 2.4 实现 `displayName` 推导逻辑：中文文件名直接去扩展名，英文文件名 hyphen→空格 + 首字母大写
- [x] 2.5 在 `vite.config.js` 中注册该插件
- [x] 2.6 确认 Vite 将 `/public/data/` 下的 PDF 自动拷贝至 `dist/data/`

## 3. 目录页（TOC）

- [x] 3.1 创建 `src/views/TocPage.vue`，页面布局含标题和列表区域
- [x] 3.2 实现 `manifest.json` 的 fetch 加载逻辑（路径使用 `import.meta.env.BASE_URL`）
- [x] 3.3 渲染 PDF 列表项，点击后 navigate 到 `/viewer/` + encodeURIComponent(path)
- [x] 3.4 实现空状态提示（无 PDF 时显示引导文字）
- [x] 3.5 实现加载状态（spinner 或骨架屏）
- [x] 3.6 页面标题设为 `manifest.siteTitle`

## 4. PDF 阅读器核心（PdfViewerPage + PdfRenderer）

- [x] 4.1 创建 `src/views/PdfViewerPage.vue`，从路由参数获取 PDF 路径并传递给渲染器
- [x] 4.2 创建 `src/components/PdfRenderer.vue`，使用 `pdfjs-dist` 加载 PDF 文档
- [x] 4.3 配置 PDF.js Worker（`GlobalWorkerOptions.workerSrc`）
- [x] 4.4 实现 Canvas 渲染：单页渲染，填满视口，保持长宽比
- [x] 4.5 实现页面索引状态管理（当前页 / 总页数）
- [x] 4.6 实现 `window.resize` 响应，窗口变化时重新渲染当前页

## 5. PDF 阅读器交互

- [x] 5.1 创建 `src/components/PageIndicator.vue`，显示 "N / M" 页码
- [x] 5.2 创建 `src/components/NavControls.vue`，提供上一页、下一页、返回 TOC 按钮
- [x] 5.3 实现键盘导航：左右箭头键翻页（`keydown` 事件监听）
- [x] 5.4 实现触控滑动导航：监听 `touchstart`/`touchend`，根据滑动方向翻页
- [x] 5.5 实现导航边界处理（首页/末页不越界）
- [x] 5.6 实现 UI 控件自动隐藏：有交互时显示，3 秒无操作后淡出

## 6. 状态处理与错误处理

- [x] 6.1 创建 `src/components/LoadingSpinner.vue` 加载动画组件
- [x] 6.2 在 PdfViewerPage 中实现 PDF 加载状态（loading / loaded / error）
- [x] 6.3 实现 PDF 加载失败的错误提示页面，含"返回目录"链接
- [x] 6.4 实现缺失 manifest 或 PDF 文件时的错误边界处理

## 7. 样式与布局

- [x] 7.1 全局样式：暗色主题、零 margin/padding、`100vw × 100vh`
- [x] 7.2 TOC 页面样式：居中列表，卡片式条目，hover 效果
- [x] 7.3 PDF 阅读器样式：Canvas 全屏居中，半透明覆盖控件，淡入淡出动画
- [x] 7.4 移动端响应式适配：TOC 列表堆叠，阅读器控件适配触控尺寸
- [x] 7.5 删除 `src/assets/main.css` 中的默认样式，替换为项目样式

## 8. 构建验证与部署准备

- [x] 8.1 创建 `/public/data/` 目录及示例 PDF 用于本地测试
- [x] 8.2 在 `vite.config.js` 中配置 `base: './'` 确保 GitHub Pages 兼容
- [x] 8.3 运行 `npm run build` 验证静态文件产出正确
- [x] 8.4 运行 `npm run preview` 本地预览完整功能
- [x] 8.5 在 README 中添加项目说明和 `/public/data/` 目录使用指南
