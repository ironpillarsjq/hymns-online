## Context

当前 TocPage.vue 中 `.toc-list` 和 `.toc-grid` 都使用 `scrollbar-width: none` 和 `::-webkit-scrollbar { display: none }` 隐藏滚动条。

## Goals / Non-Goals

**Goals:**
- 列表布局显示滚动条
- 网格布局隐藏滚动条

**Non-Goals:**
- 不修改其他功能

## Decisions

1. **滚动条显示策略**
   - 选择：列表布局显示滚动条，网格布局隐藏
   - 理由：符合用户需求

## Risks / Trade-offs

- 无风险，纯样式修改