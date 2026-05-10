## Context

当前 TocPage.vue 使用垂直列表（`<ul>`）展示 PDF 条目，最大宽度 420px，居中排列。适合少量条目，但无法支撑 500 ~ 1000 条的规模。需要改为分组网格布局，提升浏览效率。

## Goals / Non-Goals

**Goals:**
- PDF 条目按每 100 个分为一组，每组渲染为一个带浅色边框的卡片框
- 框内按钮水平排列、自动换行（flex-wrap）
- 框之间使用 CSS Grid 响应式布局：大屏 3 列、中屏 2 列、小屏 1 列
- 按钮尺寸缩小，适应大量条目
- 保留原有的点击导航、加载状态、空状态等行为

**Non-Goals:**
- 不添加搜索/过滤功能
- 不添加分页（虚拟滚动等）
- 不改变 manifest 数据结构

## Decisions

### 1. 数据分组：`computed` 属性 `chunkedPdfs`
- **选择**: 在 `<script setup>` 中使用 `computed` 将 `manifest.pdfs` 按 `slice(0,100)`, `slice(100,200)` ... 分割为二维数组
- **原因**: 纯内存操作，无性能问题；响应式自动更新
- **替代方案**: 预计算分组交给 manifest 生成器 → 增加构建复杂度，不必要

### 2. 框布局：CSS Grid（外层）+ Flexbox（内层）
- **选择**: 外层 `.toc-grid` 使用 `display: grid; grid-template-columns: repeat(3, 1fr)`；内层 `.toc-chunk` 使用 `display: flex; flex-wrap: wrap`
- **原因**: Grid 天然支持响应式列数切换；Flexbox wrap 天然实现框内换行
- **媒体查询**:
  - `>= 1200px`: 3 列，每行 10 个按钮
  - `768px ~ 1199px`: 2 列，每行 10 个按钮
  - `< 768px`: 1 列，每行 5 个按钮

### 3. 按钮尺寸：通过 CSS 变量或固定值
- **选择**: 每个按钮固定宽度 `calc((100% - 9 * 4px) / 10)`（10 个按钮 + 间距），或使用 `flex: 0 0 calc(10% - 4px)` 
- **原因**: 精确控制每行数量；使用 `gap` 简化间距
- **小屏**: `flex: 0 0 calc(20% - 4px)` 实现每行 5 个

### 4. 框样式：使用现有 `--color-light` 和 `--color-very-light`
- **选择**: 框背景 `--color-very-light`，边框 `1px solid --color-light`，圆角 8px
- **原因**: 与现有设计系统一致

## Risks / Trade-offs

- **大量缩略图/按钮导致 DOM 过多** → 500 ~ 1000 个 `<button>` 元素在 DOM 中可能影响渲染性能 → 可接受，现代浏览器可处理数千节点
- **框高度不均匀** → 每个框内条目数不同（最后一框可能不满 100），框高度自然不一致 → 使用 Grid 不会破坏布局
