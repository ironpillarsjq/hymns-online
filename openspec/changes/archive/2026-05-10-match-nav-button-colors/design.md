## Context

当前 NavControls 组件的按钮使用 `--color-primary` 作为背景色，而 PageIndicator 组件使用不同的颜色样式。需要统一颜色以提升视觉一致性。

## Goals / Non-Goals

**Goals:**
- 导航按钮颜色与页码指示器保持一致

**Non-Goals:**
- 不修改按钮功能
- 不修改布局位置

## Decisions

1. **颜色选择**
   - 选择：使用 `--color-primary` 作为主按钮色
   - 理由：与页码指示器组件保持一致

## Risks / Trade-offs

- 无风险，纯样式修改