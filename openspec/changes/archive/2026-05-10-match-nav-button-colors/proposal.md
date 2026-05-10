## Why

当前 PDF 阅读器的导航按钮（上一页、下一页、目录按钮）使用 `--color-primary` 颜色，与底部中间的页码指示器颜色不一致，影响视觉统一性。

## What Changes

- 修改 NavControls 组件中的导航按钮背景色，使用与页码指示器相同的颜色变量
- 修改按钮 hover 状态颜色，与页码指示器 hover 效果一致

## Capabilities

### New Capabilities

- 无

### Modified Capabilities

- 无（纯样式修改，不涉及需求变更）

## Impact

- 影响的代码：`src/components/NavControls.vue`
- 无新依赖引入
- 仅修改 CSS 样式变量引用