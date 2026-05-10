## Context

当前 TocPage.vue 使用单一的框式网格布局（每 100 个条目一框），缺少小量条目的紧凑模式。需支持双布局切换，适应 1 ~ 1200 条目的场景。

## Goals / Non-Goals

**Goals:**
- 列表布局：适合少量条目（<30），一行一个 PDF，简洁清晰
- 网格布局：适合大量条目（>=30），两级分组（小组 10 个 → 大组 10 个小组），紧凑高效
- 布局切换按钮：屏幕右侧固定位置，点击切换模式，图标反映当前模式
- 自动选择：根据文件数量自动选择默认布局，手动切换覆盖自动选择
- 名称截断：列表模式 20 字，网格模式 4 字

**Non-Goals:**
- 不涉及搜索/过滤/排序功能
- 不改变 manifest 数据结构
- 不添加虚拟滚动或懒加载

## Decisions

### 1. 状态管理：`layoutMode` ref + `userOverride` ref
- **选择**: `layoutMode` 取值 `'list' | 'grid'`；`userOverride` 表示用户是否手动切换过
- **逻辑**: 初始时 `userOverride = false`，根据 `pdfCount >= 30` 自动设置 `layoutMode`；用户点击切换按钮后设 `userOverride = true`，覆盖自动逻辑
- **原因**: 简单直观，无需复杂状态机

### 2. 布局切换按钮：固定定位在右侧
- **选择**: `position: fixed; right: 16px; top: 50%; transform: translateY(-50%)`，使用项目颜色变量
- **原因**: 位置固定、始终可点击，不影响页面滚动

### 3. 列表布局实现：纯 CSS 列表
- **选择**: `<ul>` + `<li>`，`overflow-y: auto`，`text-overflow: ellipsis` 截断
- **宽度**: `max-width: 420px; width: 100%`，居中
- **高度**: `height: 100%` 填满页面（在 toc-page 的 flex 布局中占剩余空间）
- **原因**: 语义化 HTML，浏览器原生滚动性能好

### 4. 网格布局数据分组：`computed` 二维数组
- **选择**: 两层 `computed`
  - `smallGroups`: 每 10 个 PDF → 一个小组（一维数组）
  - `largeGroups`: 每 10 个小组 → 一个大组（二维数组）
- **大组结构**: `[{sgIndex: 0, groups: [...]}, ...]`
- **原因**: Vue 响应式计算，自动缓存

### 5. 网格布局 CSS：外层 Grid + 中层 Column + 内层 Flex
- **选择**:
  - 大组（最外层）: `display: grid; grid-template-columns: repeat(3, 1fr)` @ >=1200px
  - 小组（中层）: `display: flex; flex-direction: column; gap: 0.25rem`
  - 按钮（内层）: `display: flex; flex-wrap: wrap; gap: 2px`
  - 按钮项: `flex: 0 0 calc(10% - 2px)` @ 大屏, `calc(20% - 2px)` @ 小屏
- **大组居中**: 用 `justify-content: center` + `auto-fit` 思路，或用 `:nth-last-child` 技巧
- **实际方案**: 在 computed 中计算大组数量，若最后一组不满 10 个小组，不强求填满
- **居中**: 使用 CSS Grid 的 `justify-items: center` 或对于不足 3 列的情况用 `place-items: center`

### 6. 名称截断：CSS `text-overflow: ellipsis` + `max-width`
- **选择**: 列表模式用 CSS `max-width` + `text-overflow: ellipsis`（20 字 = 约 20em）
- **网格模式**: 用小号字体（0.65rem）+ `text-overflow: ellipsis`（4 字 = 约 4em）
- **原因**: 纯 CSS 方案，无需 JS 截断逻辑，性能好
- **注意**: 按钮已有 `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`

## Risks / Trade-offs

- **300 ~ 1200 个 DOM 节点性能**: 全部渲染到 DOM 中可能影响初始加载 → 可接受，现代浏览器可处理数千节点
- **大组居中实现**: 纯 CSS 的最后一排居中较复杂 → 使用 Grid `auto-fill` + `justify-content: center`（附带空列填充），或用 computed 计算 `grid-column` 偏移
- **屏幕高度限制**: 1200 个条目全部渲染可能很长，但通过分组减少了视觉高度 → 加 `overflow-y: auto` 确保可滚动
