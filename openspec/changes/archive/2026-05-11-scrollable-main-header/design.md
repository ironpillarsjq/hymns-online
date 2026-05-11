## Context

TocPage 当前布局：
- `.toc-page`: `overflow-y: auto`，`height: 100%`，flex 列容器
- `.toc-title`: `flex-shrink: 0`，固定在顶部
- `.toc-list` / `.toc-grid`: `flex: 1; overflow-y: auto`，独立滚动区域

缺陷：标题在独立滚动区域之外，内容滚动时标题看到顶部后即消失。

## Goals / Non-Goals

**Goals:**
- 标题随页面内容一起纵向滚动
- 列表/网格布局不再有独立的内部滚动条

**Non-Goals:**
- 不改变标题本身样式（字号、颜色、边距等）
- 不修改分组逻辑或条目排列规则
- 不修改布局切换按钮（保持 `position: fixed`）

## Decisions

### 1. 统一滚动容器

**选择**: 移除 `.toc-list` 和 `.toc-grid` 的 `overflow-y: auto` 和 `flex: 1`，由 `.toc-page` 统一处理滚动。

```css
.toc-list {
  /* 移除 flex: 1; overflow-y: auto */
  width: 100%;
  max-width: 500px;
}
.toc-grid {
  /* 移除 flex: 1; overflow-y: auto */
  width: 100%;
  max-width: 94vw;
}
```

`.toc-page` 已有 `overflow-y: auto; height: 100%`，内容总高度超过视口时自动出现页面级滚动条，标题和内容一起滚动。

**备选**: 将标题移入列表/网格内部 — 需要修改模板，增加复杂度，且列表/网格样式不同需要分别处理。

## Risks / Trade-offs

- **[Risk] 布局切换按钮遮挡** — `position: fixed` 布局切换按钮仍固定在视口右侧，不受影响。
- **[Risk] 内容较少时排列** — 条目少时页面不需要滚动，标题正常显示顶部，与现有行为一致。
