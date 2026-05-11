## Why

TocPage 主界面中标题（`.toc-title`）固定在顶部，列表/网格内容区域独立滚动。当条目较多时，标题会移出视口顶部不可见，用户需要滚动到顶部才能确认当前页面标题。

## What Changes

- 移除 `.toc-list` 和 `.toc-grid` 的独立滚动（`overflow-y: auto`），改为由父容器 `.toc-page` 统一滚动
- 标题不再固定，随页面内容一起上下滚动

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
<!-- None — 纯 CSS 布局调整，无规格级行为变更 -->

## Impact

- `src/views/TocPage.vue` — 修改 CSS 布局规则
