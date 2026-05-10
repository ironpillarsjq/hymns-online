## Context

诗词阅读器是一个 Vue 3 + Vite 的单页应用，包含目录页（TocPage）和 PDF 阅读器页（PdfViewerPage）。项目已定义 CSS 变量颜色系统，所有页面背景为白色。当前用户需要手动按 F11 才能进入浏览器全屏模式，缺乏内置的全屏入口。

## Goals / Non-Goals

**Goals:**
- 提供一个圆形全屏按钮，固定在屏幕顶部中央
- 鼠标靠近按钮区域时显示，离开后隐藏（hover 触发，带平滑过渡）
- 点击按钮调用浏览器 Fullscreen API 进入/退出全屏
- 刚进入全屏时按钮短暂显示（~2 秒）后自动消失，作为状态确认
- 按钮在全屏/非全屏状态下均可用

**Non-Goals:**
- 不实现自定义全屏（仅使用浏览器原生 Fullscreen API）
- 不支持在无法使用 Fullscreen API 的环境（如某些 iframe）中降级
- 不改变现有组件的布局或交互

## Decisions

### 1. 组件结构：独立的 Vue 单文件组件（FullscreenButton.vue）
- **选择**: 创建 `src/components/FullscreenButton.vue`，在 `App.vue` 中全局引入
- **原因**: 全屏按钮是全局 UI，放在 App.vue 中确保在所有路由页面可见；独立组件便于维护和测试
- **替代方案**: 放在各页面中 → 代码重复，且需处理路由切换时的状态同步

### 2. 显示/隐藏机制：CSS opacity + pointer-events + Vue 响应式
- **选择**: 使用鼠标 `mousemove` 事件检测光标 Y 坐标，当光标在屏幕顶部 60px 范围内时设置 `visible = true`，否则 `visible = false`；通过 CSS transition 控制 opacity 过渡
- **原因**: `:hover` 无法处理"鼠标靠近但未悬停在按钮上"的场景；事件驱动的方案更灵活
- **替代方案**: 纯 CSS `:hover` → 按钮区域太小，难以触发

### 3. 全屏 API：`document.documentElement.requestFullscreen()`
- **选择**: 使用标准 Fullscreen API，调用 `document.documentElement.requestFullscreen()` 进入全屏，`document.exitFullscreen()` 退出全屏
- **原因**: 标准 API，所有现代浏览器支持，无需 polyfill
- **替代方案**: 使用某个库 → 增加依赖，对于如此简单的调用不必要

### 4. 进入全屏后短暂显示：`setTimeout` + Vue 响应式
- **选择**: 在 `fullscreenchange` 事件中，如果进入全屏，设置 `visible = true`，然后 `setTimeout` 2 秒后设置 `visible = false`
- **原因**: 简单直接，无需额外状态机
- **注意**: 需要清理 timer，防止内存泄漏

### 5. 按钮样式：使用现有 CSS 变量
- **选择**: 背景 `--color-primary`（#626C83），图标/文字 `--color-background`（#FFFFFF），圆形 48px 直径
- **原因**: 与现有颜色系统一致，无需新增变量

## Risks / Trade-offs

- **移动端兼容性**: iOS Safari 不支持 Fullscreen API → 按钮在移动端无功能，但会正常显示。可通过 `document.fullscreenEnabled` 检测，不支持时隐藏按钮
- **hover 区域误触发**: 鼠标在屏幕顶部附近操作浏览器标签页时可能意外显示按钮 → 按钮仅占 48px 圆形区域，"靠近"范围设为 60px 足够小，不会干扰浏览
- **timer 清理**: 组件卸载时需清理 setTimeout → 使用 `onUnmounted` 生命周期钩子
