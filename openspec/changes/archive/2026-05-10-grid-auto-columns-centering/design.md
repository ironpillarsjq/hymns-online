## Context

当前 `.toc-grid` 使用 CSS Grid，`grid-template-columns` 由 media queries 固定设置为 `repeat(3, 1fr)`、`repeat(2, 1fr)` 或 `1fr`。当内容（大组数量）不足当前列数时，网格会从左侧开始排列，留下空列。

用户期望：当内容数量 < 列数时，使用内容数量的实际列数，且整体在页面上居中。

## Goals / Non-Goals

**Goals:**
- 内容不足时，列数自动适配内容数量（如 2 个大组使用 2 列而不是 3 列）
- 列在页面内水平居中

**Non-Goals:**
- 不改变响应式断点
- 不修改小组和大组的内部布局

## Decisions

**使用 `repeat(auto-fit, calc(...))` + `justify-content: center`**

用 `calc()` 保持列宽与满列时一致，`auto-fit` 折叠空列，`justify-content: center` 居中。

```css
/* 1200px+: 最大 3 列，列宽 = (100% - 2rem) / 3 */
@media (min-width: 1200px) {
  .toc-grid {
    grid-template-columns: repeat(auto-fit, calc((100% - 2rem) / 3));
    justify-content: center;
  }
}

/* 768-1199px: 最大 2 列，列宽 = (100% - 1rem) / 2 */
@media (max-width: 1199px) and (min-width: 768px) {
  .toc-grid {
    grid-template-columns: repeat(auto-fit, calc((100% - 1rem) / 2));
    justify-content: center;
  }
}
```

- `calc((100% - 2rem) / 3)` 保证列宽 = 3 列时每列宽度（2 个 gap 各 1rem）
- `auto-fit` 内容不足时折叠空列，2 个大组只生成 2 列
- `justify-content: center` 将有效列居中

## Risks / Trade-offs

- 低风险：纯 CSS 修改，不涉及 JS 逻辑