## Why

当前网格布局的响应式列数由 CSS media queries 固定决定（1/2/3 列），但当内容数量不足一整行时，多余的列位会空出来，导致大组靠左对齐而不是居中显示。应该让列数动态适应内容数量，并在页面上居中。

## What Changes

- 修改 `.toc-grid` 的 CSS Grid 布局，使其在大组数量不足当前列数时自动居中
- 保持现有的响应式断点（1200px 以上 3 列，768-1199px 2 列，768px 以下 1 列）
- 移除空列占位，让视觉重心更集中

## Capabilities

### Modified Capabilities

- `toc-browsing`: 更新"大组不足填满行时居中"场景的描述，明确实现方式为 CSS Grid `justify-content: center` 替代 margin auto 的 hack 方式

## Impact

- `src/views/TocPage.vue` 的样式部分需要修改