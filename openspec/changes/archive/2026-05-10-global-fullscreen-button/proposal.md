## Why

诗词阅读器在桌面端使用时，浏览器工具条和地址栏会占用屏幕空间，干扰沉浸式阅读体验。提供一个全局全屏切换按钮，让用户可以一键进入/退出浏览器全屏模式，获得类似幻灯片的无干扰阅读环境。

## What Changes

- 新增全局圆形全屏按钮组件，固定在屏幕顶部中央
- 鼠标靠近按钮区域时显示按钮，离开后隐藏按钮
- 点击按钮进入/退出浏览器全屏模式（Fullscreen API）
- 刚进入全屏时按钮短暂显示后自动消失，作为状态确认

## Capabilities

### New Capabilities
- `fullscreen-toggle`: 全局全屏切换按钮，圆形悬浮在屏幕顶部中央，hover 显示/离开隐藏，全屏进入时短暂显示后消失

### Modified Capabilities
<!-- None - this is purely additive -->

## Impact

- **新增文件**: `src/components/FullscreenButton.vue`
- **修改文件**: `src/App.vue`（引入全屏按钮组件，使其全局可见）
- **依赖**: 浏览器 Fullscreen API（标准 API，无外部依赖）
