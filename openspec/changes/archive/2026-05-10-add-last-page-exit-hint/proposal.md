## Why

用户在浏览 PDF 最后一页时，缺乏明确的退出操作提示。目前需要用户自行点击导航按钮或返回按钮才能退出，操作不够直观。

## What Changes

- 在 PDF 阅读器到达最后一页后，继续向后翻页时显示"再次点击退出"提示
- 提示显示 2 秒后自动消失
- 用户在提示有效期内（2秒内）再次点击 → 退出到目录页
- 向前翻页到第一页后继续向前同理（提示"再次点击返回"）

## Capabilities

### New Capabilities

- `last-page-exit-hint`: 定义到达首/末页后的退出提示行为，包括触发条件、提示内容、有效期和退出逻辑

### Modified Capabilities

- 无

## Impact

- 影响的代码：`src/views/PdfViewerPage.vue`
- 无新依赖引入
- 与现有翻页功能（键盘、触控、点击、滚轮）集成