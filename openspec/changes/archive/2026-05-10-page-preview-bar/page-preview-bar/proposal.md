## Why

预览栏已实现缩略图展示和当前页边框高亮，但用户连续翻页时，当前页缩略图可能被滚动到可视区域之外，无法看到选中效果。需要让预览栏自动滚动，使当前播放页的缩略图始终保持在可视区域内。

## What Changes

- 预览栏在 `currentPage` 变化时自动滚动，使当前页缩略图滚动到可视区域
- 使用平滑滚动动画（`scroll-behavior: smooth` 或 `scrollIntoView`）

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `page-preview-bar`: **当前页高亮标识** — 新增要求：当前播放页切换时，预览栏自动滚动使高亮缩略图进入可视区域

## Impact

- **修改文件**: `src/components/PagePreviewBar.vue`（添加 auto-scroll 逻辑）
