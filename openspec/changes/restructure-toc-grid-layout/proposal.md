## Why

当前网格布局以"每行 10 个按钮"排列小组内条目，小组垂直堆叠，当条目较多时视觉密度过高，小组边界不清晰，用户难以快速扫描定位。

## What Changes

- 小组内条目改为每 5 个换行（取代每行 10 个），降低单行视觉密度
- 大组内的小组从垂直堆叠改为多列排列，充分利用横向空间
- 小组之间增加行间距，分组边界更明显
- 大组之间的换行规则保持现有响应式 3/2/1 列（不变）
- 每个小组的第一个条目字体加粗，作为小组边界的视觉标识
- 条目按钮尺寸适当调大，提升可点击性和可读性

## Capabilities

### New Capabilities

<!-- None -->

### Modified Capabilities

- `toc-browsing`: 网格布局的小组内排列规则、大组内小组排列规则、按钮样式规则变更

## Impact

- `src/views/TocPage.vue` — 修改 `.sg-buttons` / `.toc-btn` / `.toc-large-group` / `.toc-small-group` CSS 样式；调整模板中小组条目渲染逻辑以支持首条加粗
