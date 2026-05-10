## 1. 创建 FullscreenButton 组件

- [x] 1.1 创建 `src/components/FullscreenButton.vue`，使用 `<script setup>`（与项目 Vue 3 风格一致）
- [x] 1.2 实现全屏切换功能：使用 `document.documentElement.requestFullscreen()` 和 `document.exitFullscreen()`，通过 SVG 图标区分进入/退出全屏状态
- [x] 1.3 实现鼠标靠近显示/离开隐藏：在 `window` 上监听 `mousemove`，当 `clientY <= 60` 时显示按钮，否则隐藏；使用 CSS `opacity` + `transition` 实现淡入淡出
- [x] 1.4 实现进入全屏时短暂显示：监听 `fullscreenchange` 事件，进入全屏时设置 `visible = true`，2 秒后自动隐藏；鼠标移入时取消定时器
- [x] 1.5 在组件卸载时清理事件监听器和定时器（`onUnmounted`）
- [x] 1.6 样式：圆形 48px，`position: fixed`，顶部中央（`top: 16px; left: 50%; transform: translateX(-50%)`），`z-index: 9999`，背景 `var(--color-primary)`，图标白色，`pointer-events: none` 当隐藏时

## 2. 集成到应用

- [x] 2.1 在 `src/App.vue` 中引入并注册 `FullscreenButton` 组件，放置在 `<template>` 中（`<router-view />` 之后）
- [x] 2.2 运行 `npm run build` 验证构建无报错
