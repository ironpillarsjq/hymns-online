## Why

当前用户只能通过逐页翻页（键盘方向键、滑动、上/下一页按钮、或左侧缩略图）来切换页面。当文档页数较多时，跳转到某一特定页需要反复按键，效率很低。在底部页码指示器中增加点击输入功能，可以让用户直接输入目标页码快速跳转，显著提升阅读体验。

## What Changes

- PageIndicator 组件从纯展示变为可交互：移除 `pointer-events: none`，点击后切换为数字输入框
- 用户点击页码 → 显示 `<input>` 替换文本显示 → 输入数字后按 Enter 或失焦确认 → 跳转到对应页面并恢复文本显示
- 输入校验：仅接受 1 ~ totalPages 范围内的整数，非法输入不跳转并恢复原显示
- 输入框显示期间暂停自动隐藏计时器（controlsVisible 保持 true），确认后重新启动计时
- Esc 键取消输入恢复原显示，不跳转

## Capabilities

### New Capabilities

- `page-indicator-input`: 底部页码指示器支持点击切换为数字输入框，用户可输入页码直接跳转到指定页面

### Modified Capabilities

- `pdf-viewer`: "页码指示器浮层" 需求更新 — 指示器从纯展示变为支持点击交互、输入跳转

## Impact

- `src/components/PageIndicator.vue` — 核心修改：pointer-events、模板结构、输入框逻辑、emit 事件
- `src/views/PdfViewerPage.vue` — 新增 `onPageJump` 事件处理，调用 `rendererRef.renderPage()`；输入期间暂停自动隐藏计时
