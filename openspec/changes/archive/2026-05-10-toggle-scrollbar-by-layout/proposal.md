## Why

当前目录页无论在列表布局还是网格布局下都隐藏了滚动条，用户体验不一致。根据用户需求，列表布局时应显示滚动条以便知晓可滚动，网格布局时可隐藏滚动条。

## What Changes

- 修改列表布局 (list) 的容器样式，显示滚动条
- 保持网格布局 (grid) 的容器样式，隐藏滚动条

## Capabilities

### New Capabilities

- 无

### Modified Capabilities

- 无（纯样式修改）

## Impact

- 影响的代码：`src/views/TocPage.vue`
- 无新依赖引入
- 仅修改 CSS 样式