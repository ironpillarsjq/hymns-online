## 1. 小组内条目布局

- [x] 1.1 将 `.toc-btn` 的 `flex: 0 0 calc(10% - 2px)` 改为 `flex: 0 0 calc((100% - 8px) / 5)`，实现每行 5 个按钮；移除移动端 `@media (max-width: 767px)` 中的 `.toc-btn` 覆盖（统一 5 列）
- [x] 1.2 调整 `.toc-btn` 样式：字号 `0.9rem` → `0.8rem`，padding `0.3em 0.3em` → `0.4em 0.5em`

## 2. 小组边界与间距

- [x] 2.1 添加 `.sg-buttons > :first-child { font-weight: 700; }` 实现每组首条目加粗
- [x] 2.2 将 `.toc-small-group` 的 `margin-bottom: 0.35rem` 增大为 `0.8rem`，增加小组间距

## 3. 大组内小组纵向排列

- [x] 3.1 移除 `.toc-large-group` 的 `columns` / `column-gap`，改为 `display: flex; flex-direction: column; gap: 0.8rem`，确保小组仅纵向堆叠
- [x] 3.2 移除 `.toc-small-group` 的 `break-inside: avoid` 和 `margin-bottom`（间距由父容器 `gap` 统一控制）
- [x] 3.3 移除 `.toc-large-group` 的响应式 `columns` 断点（`@media` 中 `columns: 2` / `columns: 1`）
