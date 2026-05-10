## Context

预览栏（`PagePreviewBar.vue`）已实现左侧缩略图列表，当前页通过 `--color-primary` 边框高亮。但缩略图列表是可滚动的（`overflow-y: auto`），当 PDF 页数较多时，当前页缩略图可能滚动到可视区域之外，用户翻页后无法直接看到高亮效果。

## Goals / Non-Goals

**Goals:**
- 当 `currentPage` 变化时，自动滚动缩略图列表，使当前页缩略图进入可视区域
- 使用平滑滚动动画

**Non-Goals:**
- 不改变预览栏的触发方式或布局
- 不改变缩略图生成逻辑

## Decisions

### 1. 使用 Vue `watch` + 原生 `scrollIntoView`
- **选择**: 在 `currentPage` 的 `watch` 回调中，通过 `document.querySelector` 找到当前页缩略图的 DOM 元素，调用 `scrollIntoView({ behavior: 'smooth', block: 'nearest' })`
- **原因**: 简单直接，无需引入第三方库；`block: 'nearest'` 仅在缩略图不可见时才滚动，避免不必要的动画
- **替代方案**: CSS `scroll-behavior: smooth` + `scrollTop` 计算 → 需要手动计算偏移量，繁琐且易出错

### 2. 使用 `ref` 绑定到缩略图容器而不是 `querySelector`
- **选择**: 在 `v-for` 中使用 `:ref` 函数收集每个缩略图的 DOM 引用，然后在 watch 中直接使用对应的 ref
- **原因**: Vue 推荐方式，避免 DOM 查询，更可靠
- **权衡**: 但对于动态列表，使用 `:ref` 配合 `ref` 函数是标准做法

### 3. 延迟执行滚动
- **选择**: watch 回调中使用 `nextTick` 确保 DOM 更新后再滚动
- **原因**: `currentPage` 可能先于 `thumbnails` 列表渲染完成，需要等待 DOM 就绪

## Risks / Trade-offs

- **缩略图未生成时**: PDF 刚加载时 `thumbnails` 可能为空，`scrollIntoView` 会无操作 → watch 中检查 `thumbnails.value.length > 0`
- **频繁翻页性能**: 连续快速翻页可能触发多次 `scrollIntoView` 动画 → `block: 'nearest'` 避免滚动动画，且 `scrollIntoView` 会自动中断前一个动画
