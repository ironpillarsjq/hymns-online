## 背景

本项目是一个全新的诗歌 PDF 在线阅读网站。当前项目状态为 Vue 3 + Vite 脚手架模板（含默认示例组件），尚未实现任何业务功能。项目已安装 `pdfjs-dist` 依赖。

目标用户：希望以沉浸式、全屏翻页方式阅读诗歌 PDF 的读者。
部署目标：GitHub Pages，纯静态文件，无后端服务。
数据来源：本地 `/public/data/<网站标题>/` 目录下的 PDF 文件。

## 目标 / 非目标

**目标：**
- 实现两个核心页面：目录页（TOC）和 PDF 阅读页
- PDF 全屏分页渲染，类似 PPT 播放的浏览体验
- 支持键盘翻页（左右箭头键）
- 支持触控滑动翻页（移动端）
- 构建时自动发现 `/public/data/` 下的 PDF 文件，生成清单文件
- 输出纯静态文件，可零配置部署到 GitHub Pages

**非目标：**
- 不支持 PDF 文本选择、搜索、标注、缩放（保持 PPT 式简约体验）
- 不提供用户上传 PDF 功能
- 不提供 PDF 内部目录/书签解析
- 不提供 PDF 下载按钮（可通过浏览器原生能力下载）
- 不支持打印功能
- 不考虑 SEO（SPA 单页应用）

## 技术决策

### 1. 路由方案：Vue Router + Hash 模式

**选择**：使用 Vue Router 的 `createWebHashHistory`（hash 模式）。

**理由**：GitHub Pages 不支持 SPA 的 HTML5 History 模式（刷新非根路径会 404）。Hash 模式完全在客户端解析路由，无需服务端配置。

**备选方案**：
- History 模式 + 404.html 重定向 hack：可行但 hacky，且部分 CDN 不支持。
- 单页条件渲染（无路由）：简单但不支持浏览器前进/后退，体验差。

### 2. PDF 渲染：pdfjs-dist + Canvas

**选择**：使用 `pdfjs-dist` 库，在 `<canvas>` 元素上渲染每一页，单页全屏显示。

**理由**：
- `pdfjs-dist` 是 Mozilla 官方库，渲染质量高，已安装依赖
- Canvas 渲染性能好，适合整页渲染
- 自身支持 Worker 线程，不会阻塞主线程

**备选方案**：
- `<iframe>` 嵌入 PDF：无法控制翻页行为，也不支持全屏分页模式
- `@vue-pdf-viewer` 等封装库：增加额外依赖，灵活性受限

**PDF.js Worker 配置**：
Worker 文件从 `pdfjs-dist` 包中复制，使用 `GlobalWorkerOptions.workerSrc` 指向本地 worker 文件。Vite 构建时需确保 worker 文件正确输出。

### 3. 数据管道：Vite 插件 + 静态 JSON Manifest

**选择**：自定义 Vite 插件，在构建时扫描 `/public/data/` 目录，生成 `manifest.json` 输出到 `dist/`。

**理由**：
- 构建时处理，零运行时开销
- JSON 文件可直接被前端 fetch 加载
- Vite 插件生态原生支持文件操作
- `/public/` 目录下的 PDF 由 Vite 自动处理拷贝，插件无需操心文件搬运

**Manifest 结构**：
```json
{
  "siteTitle": "poems",
  "pdfs": [
    {
      "fileName": "spring-morning",
      "displayName": "春晓",
      "path": "data/poems/spring-morning.pdf"
    }
  ]
}
```

**备选方案**：
- 手动维护 JSON 文件：维护负担大，数据源和清单容易不同步
- 动态 import.meta.glob：Vite 的 glob import 可以做到，但需要文件放在 `src/` 下，不符合数据与源码分离的理念

### 4. 组件架构：两个视图组件 + 多个功能组件

**选择**：
```
App.vue                         # 根组件，提供 <router-view>
views/
  TocPage.vue                   # 目录页
  PdfViewerPage.vue             # PDF 阅读页
components/
  PdfRenderer.vue               # 核心 PDF 渲染组件（canvas 管理）
  PageIndicator.vue             # 页码指示器
  NavControls.vue               # 导航控制栏
  LoadingSpinner.vue            # 加载状态
  EmptyState.vue                # 空状态提示
```

**路由配置**：
- `/` → `TocPage`
- `/viewer/:encodedPath` → `PdfViewerPage`（参数为 PDF 相对路径的编码形式）

### 5. UI 风格：极简暗色主题

**选择**：全屏阅读采用深色背景，最小化 UI 干扰。导航控件和页码指示器为半透明覆盖层，鼠标移动或触控时显示，3 秒无操作后自动淡出。

**理由**：阅读场景下 UI 应退居其次。PPT 式的隐藏控件模式已在 Keynote / PowerPoint 演示模式中验证。

### 6. 移动端适配：响应式 + 触控手势

**选择**：
- 所有界面使用 `100vw × 100vh` 视口单位
- Touch 事件监听 `touchstart` / `touchend` 计算滑动方向和距离
- 移动端 TOC 页面采用堆叠列表布局

## 风险 / 取舍

- **[风险] PDF.js 对大文件（>50MB）渲染慢** → 缓解：显示加载进度条；建议用户将超大 PDF 拆分
- **[风险] 移动端 PDF 渲染内存占用高** → 缓解：始终只渲染当前页（不预渲染前后页），旧 canvas 销毁后重建
- **[风险] GitHub Pages 带宽限制** → 缓解：建议 PDF 文件大小控制在合理范围内（<10MB）；可考虑 Git LFS
- **[取舍] 无文本选择/搜索功能** → 这是刻意的设计取舍，保持 PPT 式沉浸阅读体验。用户可通过文件名查找对应诗歌
