## 1. PageIndicator 组件改造

- [x] 1.1 移除 CSS 中 `pointer-events: none`，使组件可点击
- [x] 1.2 添加 `isEditing` 和 `editPage` 响应式状态（ref）
- [x] 1.3 修改模板：`isEditing` 为 false 时显示 "{{ currentPage }} / {{ totalPages }}" 文本，点击后切换为输入框
- [x] 1.4 点击文本时进入编辑模式：设置 `isEditing = true`、预填当前页码、emit `editstart`、在 nextTick 中自动聚焦并全选输入框文本
- [x] 1.5 实现输入确认逻辑（Enter / 失焦）：校验输入值在 [1, totalPages] 范围内，有效则 emit `jump-to(pageNum)` 并退出编辑；无效则仅退出编辑恢复原显示
- [x] 1.6 实现 Esc 取消逻辑：退出编辑模式、恢复原显示、emit `editcancel`，不触发跳转
- [x] 1.7 输入框样式：匹配指示器 pill 形状，白色文字半透明黑底，与文本显示风格一致

## 2. PdfViewerPage 事件对接

- [x] 2.1 在模板中为 PageIndicator 绑定 `@editstart`、`@jump-to`、`@editcancel` 事件处理器
- [x] 2.2 实现 `onEditStart`：清除 hideTimer 并暂不启动新计时，保持 controlsVisible 为 true
- [x] 2.3 实现 `onPageJump(pageNum)`：调用 `rendererRef.value.renderPage(pageNum)` 执行跳转，并调用 `resetHideTimer()` 恢复自动隐藏
- [x] 2.4 实现 `onEditCancel`：调用 `resetHideTimer()` 恢复自动隐藏

## 3. 验证

- [x] 3.1 验证点击页码能切换为输入框，预填当前页码且全选
- [x] 3.2 验证输入有效页码后 Enter/失焦跳转正确，页码显示更新
- [x] 3.3 验证输入超出范围或非法内容时不跳转，恢复原页码显示
- [x] 3.4 验证 Esc 取消输入不跳转
- [x] 3.5 验证输入期间自动隐藏暂停，确认/取消后恢复
- [x] 3.6 验证输入框样式与整体 UI 一致
