## 为什么

当前应用依赖 PDF.js 进行文档渲染，引入了约 300KB+ 的重型依赖和复杂的 Canvas 渲染逻辑。对于诗歌/圣诗这种使用场景，使用预渲染的图片能提供更好的视觉保真度和更小的打包体积。用户可以在任意工具中准备图片，直接拖入文件夹即可，无需生成 PDF。

## 改什么

- **BREAKING**：将 PDF 文件支持替换为图片文件支持 —— `.pdf` 文件不再被发现或渲染
- **BREAKING**：数据源从单个 PDF 文件变更为包含编号图片的文件夹（如 `01.jpg`、`02.jpg`、`03.jpg`）
- **BREAKING**：移除 `pdfjs-dist` 依赖；改用原生 `<img>` 渲染
- 将 `PdfRenderer.vue` 替换为 `ImageRenderer.vue` 组件，原生展示图片
- 将 Vite 清单插件改为发现图片文件夹，按数字文件名排序列出图片文件
- 将目录页改为展示文件夹（每个文件夹代表一组图片），而非单个 PDF 文件
- 将预览栏改为展示图片缩略图（实际图片的 CSS 缩放版本），而非 PDF.js 生成的缩略图
- 所有导航、全屏、控制按钮、UI 样式功能保持不变

## 能力

### 新增能力
- `image-data-source`：构建时从 `/public/data/` 发现图片文件夹，生成清单（图片文件按数字文件名排序），全静态资源服务
- `image-viewer`：通过原生 `<img>` 元素进行的核心图片渲染，包括每次显示一张图片、保持宽高比填满视口、导航（键盘/触控/点击/滚动）以及加载/错误状态

### 修改的能力
- `pdf-data-source`：**BREAKING** —— 完全由 `image-data-source` 替代。不再发现 PDF 文件；改为发现包含编号图片的文件夹
- `pdf-viewer`：**BREAKING** —— 完全由 `image-viewer` 替代。不再使用 PDF.js Canvas 渲染；使用原生 `<img>` 元素
- `page-preview-bar`：更新为使用实际图片 URL 配合 CSS 缩放来生成缩略图，替代 PDF.js 离屏 Canvas 渲染
- `toc-browsing`：更新为列出图片文件夹（含图片数量），而非 PDF 文件；导航路由参数改为文件夹路径

## 影响范围

- **依赖**：移除 `pdfjs-dist`（约 300KB+ 节省）；无需新增依赖
- **组件**：移除 `PdfRenderer.vue`，新增 `ImageRenderer.vue`
- **构建插件**：重写 `vite-plugin-pdf-manifest.js` → `vite-plugin-image-manifest.js`，改为发现含编号图片的文件夹
- **视图**：`PdfViewerPage.vue` → 更新使用 `ImageRenderer`；`TocPage.vue` → 更新展示文件夹及图片数量
- **预览栏**：`PagePreviewBar.vue` → 将 PDF.js 缩略图生成替换为原生 `<img>` 缩放
- **路由**：不变（仍为 `/` 和 `/viewer`）
- **不变的规范**：`click-scroll-navigation`、`color-theme`、`fullscreen-toggle`、`last-page-exit-hint`、`page-indicator-input`、`toc-layout-switch`、`ui-style`
