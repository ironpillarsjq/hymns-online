## 为什么

读者需要一个无需安装任何软件、直接通过浏览器就能优雅浏览诗歌 PDF 合集的静态网站。现有方案要么需要上传到第三方平台，要么依赖复杂的本地阅读器，体验不够纯粹与专注。本项目提供一个零运行时依赖的静态站点方案，适合部署到 GitHub Pages，让诗歌阅读像翻阅 PPT 一样沉浸。

## 变更内容

- 新增 `/public/data` 目录约定：本地存放 `<网站标题>/` 子文件夹，内含 PDF 文件，构建时自动发现并随 Vite public 目录一同输出
- 新增目录页（TOC）：以卡片或列表形式展示所有 PDF 文件名称，点击进入对应阅读页
- 新增 PDF 阅读页：基于 PDF.js 渲染，支持全屏分页浏览、键盘/触控翻页，类似 PPT 播放体验
- 将项目从 Vue 脚手架模板重构为诗歌 PDF 阅读器应用，移除默认模板代码
- 新增 GitHub Pages 构建部署流程（静态文件输出）

## 能力划分

### 新增能力
- `pdf-data-source`：基于 `/public/data` 目录的 PDF 数据源发现与清单生成机制
- `toc-browsing`：目录页面，列出所有诗歌 PDF 名称，提供导航至阅读页
- `pdf-viewer`：PDF 全屏分页渲染与浏览，支持键盘翻页、触控滑动、缩略图导航

### 修改的现有能力
<!-- 全新项目，无现有 spec 需要修改 -->

## 影响范围

- 替换现有 Vue 脚手架代码（`App.vue`、`components/` 内默认组件）
- 依赖 `pdfjs-dist`（已安装）进行 PDF 渲染
- 利用 Vite 的 `public/` 目录机制：`/public/data/` 下的 PDF 文件自动拷贝至输出目录
- 通过 Vite 插件在构建时扫描 `/public/data/` 并生成 `manifest.json`
- 最终产物为纯静态文件（HTML/CSS/JS/PDF），可直接部署至 GitHub Pages
- 无后端服务，无运行时依赖（除浏览器端 PDF.js Worker）
