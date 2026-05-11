## Why

在图片浏览器的边界（首页/末页）处，用户触发了退出提示后，点击相反方向的导航按钮也会错误地退出到目录页，而不是执行正常的翻页操作；同时，图片在浏览视口中未始终填满屏幕，小尺寸图片不会自动缩放至全屏。

## What Changes

- 修复边界退出提示的方向感知逻辑：在退出提示可见时，只有与提示方向匹配的导航操作才触发退出，相反方向的导航操作恢复正常翻页行为
- 图片渲染从 `max-width/max-height: 100%` 改为 `width/height: 100%` + `object-fit: contain`，确保图片始终填充视口并保持宽高比

## Capabilities

### New Capabilities

<!-- None -->

### Modified Capabilities

- `last-page-exit-hint`: 退出提示仅在再次执行相同方向的边界操作时触发退出，相反方向的操作正常翻页
- `image-viewer`: 图片元素使用 `width: 100%; height: 100%; object-fit: contain` 填充视口，替代原有的 `max-width/max-height`

## Impact

- `src/views/ViewerPage.vue` — 修改 `onNavPrev()`、`onNavNext()`、`onClick()` 的方向感知退出逻辑
- `src/components/ImageRenderer.vue` — 修改 `.renderer-img` CSS 样式为全屏填充
