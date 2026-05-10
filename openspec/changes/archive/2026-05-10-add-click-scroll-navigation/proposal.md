## Why

当前 PDF 阅读器只支持键盘方向键和触控滑动翻页，缺乏鼠标交互。用户在使用桌面设备时，无法通过点击页面或滚动鼠标滚轮来导航页面，操作不够直观便捷。

## What Changes

- 新增鼠标点击页面翻页功能：点击页面任意位置切换到下一页
- 新增鼠标滚轮翻页功能：向上滚动翻到上一页，向下滚动翻到下一页
- 滚轮翻页不触发页面默认的滚动行为（避免与页面内容滚动冲突）

## Capabilities

### New Capabilities

- `click-scroll-navigation`: 定义鼠标点击和滚轮在 PDF 阅读器中的翻页行为，包括点击区域判断、滚轮方向识别、防抖处理等

### Modified Capabilities

- 无（现有 spec 中 pdf-viewer 已定义键盘导航和触控导航，本次新增鼠标交互为补充功能）

## Impact

- 影响的代码：`src/components/PdfViewer.vue` 或相应的 PDF 阅读器组件
- 无新依赖引入
- 与现有键盘导航、触控导航共存