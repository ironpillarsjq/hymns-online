## Context

PageIndicator 组件当前是一个纯展示组件（`pointer-events: none`），在视口底部居中显示 "当前页 / 总页数"。所有页面状态由 PdfViewerPage.vue 管理，通过 props 向下传递。组件跟随 3 秒无操作自动隐藏的机制，由父组件的 `controlsVisible` ref 控制。

用户希望点击页码区域后能直接输入数字跳转到目标页，避免在长文档中逐页翻页。

## Goals / Non-Goals

**Goals:**
- PageIndicator 支持点击切换为数字输入框
- 用户可输入页码，按 Enter 或失焦确认跳转
- 输入校验：仅接受 1 ~ totalPages 范围内的整数
- Esc 取消输入，恢复显示状态
- 输入期间暂停自动隐藏计时器，确认/取消后恢复

**Non-Goals:**
- 不增加键盘快捷键触发输入模式（仅点击）
- 不增加独立于指示器之外的页码输入入口
- 不增加自动补全或下拉建议

## Decisions

### 1. 编辑状态管理：组件内部 vs 父组件

**选择：** 在 PageIndicator 内部管理 `isEditing` ref。

**理由：** 编辑模式是纯 UI 关注点，不影响其他组件。仅在确认跳转时通过 emit 通知父组件执行实际跳转，保持组件职责单一。父组件无需知道输入框的显示/隐藏细节。

**替代方案：** 将 `isEditing` 提升到 PdfViewerPage。会增加父组件复杂度且不必要——编辑态不影响其他 UI。

### 2. 输入框类型：`type="number"` vs `type="text"`

**选择：** `<input type="text" inputmode="numeric" pattern="[0-9]*">`

**理由：**
- `inputmode="numeric"` 在移动端弹出数字键盘，与 `type="number"` 效果一致
- 避免 `type="number"` 的浏览器默认 spinner（上下箭头），在 Firefox 中无法完全隐藏
- 避免 `type="number"` 允许科学计数法（e）、小数点、负号等非法字符
- 配合 JS 层 `parseInt` 校验，逻辑清晰可控

### 3. 与自动隐藏计时器的交互

**选择：** 通过 emit 事件通知父组件——进入编辑时 emit `editstart`，父组件暂停计时器；确认/取消时 emit 跳转事件或 `editcancel`，父组件恢复计时器。

**理由：** PageIndicator 不应直接控制计时器（归属父组件）。通过事件解耦，父组件自然响应。具体实现：
- 点击进入编辑 → emit `editstart`，父组件 `clearTimeout(hideTimer)` 且不启动新计时
- Enter/失焦确认 → emit `jump-to(pageNum)`，父组件执行跳转 + `resetHideTimer()`
- Esc 取消 → emit `editcancel`，父组件 `resetHideTimer()`

### 4. 进入编辑时的默认值

**选择：** 输入框预填当前页码，并自动聚焦、全选文本。

**理由：** 用户可以直接输入新页码覆盖（最常用场景），也可以在当前页附近微调（删除后输入）。

## Risks / Trade-offs

- [复杂度] 输入期间自动隐藏计时器暂停 → 若用户长时间不操作输入框，控件不会自动隐藏。通过保留 blur 事件处理缓解——任何外部点击都会触发 blur 并退出编辑模式。
- [可访问性] 输入框较小，手指较粗的移动端用户可能误触 → 输入框保持最小宽度（约 60px），与周围有足够间距。
