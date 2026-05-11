## Context

当前 `ViewerPage.vue` 中的退出提示逻辑在 `onNavPrev()` 和 `onNavNext()` 中仅检查 `exitHintVisible` 状态，不区分提示的方向。导致用户在末页触发「再次点击退出」提示后，点击「上一页」按钮也会退出；在首页触发「再次点击返回目录」提示后，点击「下一页」按钮也会退出。

`ImageRenderer.vue` 当前使用 `max-width: 100%; max-height: 100%` 限制图片大小，当图片原始尺寸小于视口时不会放大填充，未实现 spec 要求的「填满视口」。

## Goals / Non-Goals

**Goals:**
- 退出提示仅在用户再次执行相同方向的边界操作时触发退出
- 退出提示可见时，相反方向的导航操作恢复正常翻页
- 图片在浏览视口中始终填充可用空间，保持宽高比

**Non-Goals:**
- 不改变键盘、滚轮、触控等输入方式的边界行为（这些直接调用 `goPrev`/`goNext`，不检查 `exitHintVisible`）
- 不改变退出提示的视觉样式和 2 秒自动消失逻辑

## Decisions

### 1. 方向感知退出逻辑

**选择**：在 `onNavPrev()`、`onNavNext()`、`onClick()` 中比较 `exitHintDirection` 与当前操作方向，仅匹配时退出。

**理由**：
- `onNavPrev`：仅当 `exitHintDirection === 'prev'` 时执行 `goBack()`；否则清除提示并正常执行 `goPrev()`
- `onNavNext`：仅当 `exitHintDirection === 'next'` 时执行 `goBack()`；否则清除提示并正常执行 `goNext()`
- `onClick`：点击操作始终对应「前进」方向，仅当 `exitHintDirection === 'next'` 时退出；否则清除提示并正常执行 `goNext()`

**备选方案（已拒绝）**：
- 移除所有退出提示逻辑：破坏已有的末页退出体验，且 spec 明确要求该功能
- 在 `goPrev`/`goNext` 层面处理：边界检查已在此处，引入方向感知会让底层函数职责混乱

### 2. 图片全屏填充

**选择**：将 `.renderer-img` 从 `max-width: 100%; max-height: 100%` 改为 `width: 100%; height: 100%; object-fit: contain`。

**理由**：
- `width: 100%; height: 100%` 强制 `<img>` 元素填满父容器（`.image-renderer` 已为 100% × 100%）
- `object-fit: contain` 在元素框内按比例缩放图片内容，保留宽高比，多余区域自动留空
- 相比 `max-width/max-height`，此方案能将小尺寸图片也放大至填满视口
- 无需引入 canvas 或其他渲染方式，保持现有 `<img>` 原生渲染的简洁性

## Risks / Trade-offs

- **[Risk] 低分辨率图片放大后模糊** — 用户放入的图片分辨率过低时，全屏放大后可能模糊。Mitigation: 这是图片素材质量的预期行为，非代码缺陷。
- **[Risk] `onClick` 方向逻辑与直觉差异** — 在首页触发「再次点击返回目录」提示后，点击页面空白区域会翻到下一页而不是退出。这与点击即「前进」的语义一致，但用户可能期望点击也退出。Mitigation: 点击的语义是翻到下一页，与提示方向不一致时不退出是合理的。
