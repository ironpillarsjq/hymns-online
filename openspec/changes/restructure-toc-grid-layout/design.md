## Context

当前 `TocPage.vue` 网格布局中：
- 小组内条目按钮 `flex: 0 0 calc(10% - 2px)`，每行 10 个，极度密集
- 大组内小组 `flex-direction: column` 垂直堆叠，横向空间利用率低
- 小组间距 `margin-bottom: 0.35rem` 偏小
- 没有小组边界的视觉标识

分组结构（10 条目 = 1 小组，10 小组 = 1 大组）保持不变。

## Goals / Non-Goals

**Goals:**
- 小组内条目每 5 个换行，降低视觉密度
- 大组内小组改为多列排列，利用横向空间
- 小组间距加大，分组边界更清晰
- 每个小组首条目加粗，提供边界视觉锚点
- 大组间响应式 3/2/1 列规则不变

**Non-Goals:**
- 不改变分组逻辑（10/100 的分组规则完全不变）
- 不修改列表布局模式
- 不修改大组外层的 CSS Grid 响应式断点（768px / 1200px）

## Decisions

### 1. 小组内 5 项每行

**选择**: 将 `.toc-btn` 的 `flex: 0 0 calc(10% - 2px)` 改为 `flex: 0 0 calc(20% - 2px)`，移动端保持 `calc(20% - 2px)`。

`gap: 2px` 不变，因此实际计算需考虑 gap。5 项 = 5 × 20% = 100%，但 gap 会占用额外空间。由于 `gap` 在 flex-wrap 容器中的计算方式，5 个 `20%` 宽度的元素加 4 个 2px gap 会超出父容器宽度，导致实际只排 4 个换行到第 5 个。

需微调为 `calc(20% - 4px)` 或直接使用百分比配合 gap。对 5 列布局，5 个 2px gap 占 8px（4 个 gap × 2px），`flex: 0 0 calc((100% - 8px) / 5)` 更精确。

**备选**: 使用 `flex: 1 1 18%` + `min-width: 18%` — 不够精确，会有对齐问题。

### 2. 大组内小组列排列

**选择**: 使用 CSS `columns` 属性，桌面端 3 列，平板 2 列，移动端 1 列（即不做 column 布局，回退垂直堆叠）。

```css
.toc-large-group {
  columns: 3;
  column-gap: 0.5rem;
}
.toc-small-group {
  break-inside: avoid;  /* 防止小组跨列断开 */
}
```

CSS columns 的排列顺序是自上而下再从左到右，与"按列排列"语义一致。

**备选**: CSS Grid `grid-auto-flow: column` — 需要知道总行数才能设置 `grid-template-rows`，不适合动态内容。

### 3. 首条目加粗

**选择**: `.sg-buttons > :first-child { font-weight: 700; }`

无需修改模板，纯 CSS 实现。

### 4. 按钮尺寸调整

**选择**: 字号从 `0.9rem` 调整为 `0.8rem`，padding 从 `0.3em 0.3em` 改为 `0.4em 0.5em`。

理由: 5 列排列下按钮宽度增加（约 20% vs 10%），可适当增大内边距。字号微调保持 4 字符在按钮内可见。`min-width` 保持 `4em`。

## Risks / Trade-offs

- **[Risk] 列数多时小组名称截断** — 每组首条加粗后可能因字宽增加导致截断更明显。Mitigation: 保持 `text-overflow: ellipsis` 截断。
- **[Risk] CSS columns 在移动端异常** — 某些老浏览器不支持 `columns`。Mitigation: 移动端 `columns: 1` 回退为普通垂直排列。
