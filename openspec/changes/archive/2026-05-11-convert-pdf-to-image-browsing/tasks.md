## 1. 移除 PDF 依赖和旧文件

- [x] 1.1 从 `package.json` 依赖中移除 `pdfjs-dist`
- [x] 1.2 删除 `src/components/PdfRenderer.vue`
- [x] 1.3 删除 `vite-plugin-pdf-manifest.js`
- [x] 1.4 删除 `public/pdf.worker.min.mjs`
- [x] 1.5 运行 `npm install` 清理 node_modules

## 2. 创建图片清单插件

- [x] 2.1 创建 `vite-plugin-image-manifest.js`，扫描 `public/data/<站点>/<文件夹>/` 发现图片文件夹
- [x] 2.2 实现 `deriveDisplayName()`：中文保留原名，英文连字符 → 空格分隔首字母大写
- [x] 2.3 实现数字文件名排序（提取前导数字，按数值比较）
- [x] 2.4 支持图片格式：`.jpg`、`.jpeg`、`.png`、`.webp`、`.gif`、`.bmp`
- [x] 2.5 生成清单结构：`{ siteTitle, folders: [{ folderName, displayName, path, imageCount, images: [...] }] }`
- [x] 2.6 添加开发服务器中间件，实时提供 `/data/manifest.json`
- [x] 2.7 添加 `generateBundle()` 钩子，构建时输出清单文件
- [x] 2.8 移除 PDF Web Worker 拷贝步骤（不再需要）

## 3. 创建 ImageRenderer 组件

- [x] 3.1 创建 `src/components/ImageRenderer.vue`
- [x] 3.2 接收 props：`images`（图片 URL 数组）、`initialIndex`（默认 0）
- [x] 3.3 发送事件：`loaded`（首张图片加载完成）、`error`（加载失败）、`pageChange`（索引变化）
- [x] 3.4 使用 `<img>` 配合 CSS `object-fit: contain` 渲染当前图片，填满视口并保持宽高比
- [x] 3.5 实现 `nextImage()`、`prevImage()`、`goToImage(index)` 方法
- [x] 3.6 暴露 `currentIndex`、`totalImages`、`goToImage` 给父组件
- [x] 3.7 后台预加载相邻图片（索引 ± 1），使用 `new Image()` 或 `<link rel="preload">`
- [x] 3.8 窗口大小变化通过 CSS 自动适配（`object-fit` 无需 JavaScript）
- [x] 3.9 当前图片加载中显示 loading 动画；加载失败显示错误状态

## 4. 重命名并更新 ViewerPage

- [x] 4.1 将 `src/views/PdfViewerPage.vue` 重命名为 `src/views/ViewerPage.vue`
- [x] 4.2 更新导入：`PdfRenderer` → `ImageRenderer`
- [x] 4.3 读取 `folder` 查询参数替代 `path`
- [x] 4.4 获取 `/data/manifest.json`，匹配查询参数对应的文件夹
- [x] 4.5 构建图片 URL 数组：`BASE_URL + folder.path + '/' + imageFileName`
- [x] 4.6 更新 `onLoaded` 处理器：使用 `numImages` 替代 `numPages`
- [x] 4.7 更新渲染器方法调用：`nextPage()` → `nextImage()`、`prevPage()` → `prevImage()`、`renderPage(n)` → `goToImage(n)`
- [x] 4.8 更新预览栏 props：传入 `images` 数组和 `currentIndex`，替代 `pdfDoc`、`currentPage`、`totalPages`
- [x] 4.9 保持所有导航逻辑不变（键盘、触控、点击、滚动、退出提示、计时器管理）

## 5. 更新 TocPage

- [x] 5.1 更新清单字段引用：`manifest.pdfs` → `manifest.folders`
- [x] 5.2 更新条目展示：显示 `folder.displayName` 和 `folder.imageCount`（如 "春天（12张）"）
- [x] 5.3 将 `openPdf()` 改为 `openFolder()`：导航至 `/viewer?folder=<folder.path>`
- [x] 5.4 更新网格分组逻辑：`smallGroups` 和 `largeGroups` 从 `manifest.folders` 计算
- [x] 5.5 更新空状态提示信息：提示放置图片文件夹而非 PDF 文件
- [x] 5.6 保持布局切换、列表/网格模式切换及所有 CSS 不变

## 6. 更新 PagePreviewBar

- [x] 6.1 修改 props：接收 `images`（URL 字符串数组）和 `currentIndex`（数字），替代 `pdfDoc`、`currentPage`、`totalPages`
- [x] 6.2 移除 `generateThumbnails()` 及所有 PDF.js `getPage()` / Canvas 渲染代码
- [x] 6.3 使用 `<img>` 元素渲染缩略图，直接使用图片 URL，CSS 限制宽度 120px
- [x] 6.4 更新高亮判断：`index === currentIndex` 替代 `t.pageNum === currentPage`
- [x] 6.5 更新点击处理器：`navigateTo` 事件改为发送图片索引而非页码
- [x] 6.6 保持所有 CSS 样式、悬停行为、显示/隐藏逻辑不变

## 7. 更新路由

- [x] 7.1 更新 `src/router/index.js`：将 `PdfViewerPage` 导入改为 `ViewerPage`
- [x] 7.2 更新 `/viewer` 路由的组件引用
- [x] 7.3 确保路由名称不变（`toc`、`viewer`）

## 8. 更新 Vite 配置

- [x] 8.1 更新 `vite.config.js`：将 `pdfManifestPlugin` 导入改为 `imageManifestPlugin`
- [x] 8.2 更新 plugins 数组使用新插件

## 9. 清理残余引用

- [x] 9.1 搜索并更新所有剩余的 "pdf" 相关 CSS 类名或注释（规范文件保持不变）
- [x] 9.2 检查 `App.vue` 是否有 PDF 相关导入需要更新
- [x] 9.3 检查 `index.html` 是否有 PDF 相关引用

## 10. 验证

- [x] 10.1 运行 `npm run dev`，验证开发服务器正确提供 `/data/manifest.json`
- [x] 10.2 在 `public/data/` 中放置含编号图片的示例文件夹进行测试
- [x] 10.3 验证目录页展示文件夹及图片数量
- [x] 10.4 验证图片阅读器加载、导航（键盘、点击、滚动、触控）及页码指示器正常
- [x] 10.5 验证预览栏显示图片缩略图，点击跳转正常
- [x] 10.6 验证全屏切换功能正常
- [x] 10.7 验证首张/末张图片的退出提示（双击退出）
- [x] 10.8 验证目录页布局切换（列表/网格）正常
- [x] 10.9 运行 `npm run build`，验证 `docs/` 中静态输出包含正确的清单和图片文件
- [x] 10.10 运行 `npm run preview`，验证构建后的站点正常
