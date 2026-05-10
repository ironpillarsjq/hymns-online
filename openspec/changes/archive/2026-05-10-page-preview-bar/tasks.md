## 1. 创建预览栏组件

- [x] 1.1 创建 `src/components/PagePreviewBar.vue`，定义组件 props（`pdfDoc`、`currentPage`、`totalPages`、`visible`）和 emits（`navigateTo`），搭建基础模板
- [x] 1.2 实现预览栏 CSS 布局：`position: fixed; left: 0; top: 0; width: 150px; height: 100vh`，背景 `rgba(0,0,0,0.85)`，z-index: 15，通过 `transform: translateX(-100%)` ↔ `translateX(0)` 实现滑入滑出（transition 0.2s）
- [x] 1.3 隐藏滚动条：`overflow-y: auto` + `scrollbar-width: none` / `::-webkit-scrollbar { display: none }`

## 2. 缩略图渲染

- [x] 2.1 使用 pdf.js 的 `pdfDoc.getPage(i)` 循环渲染所有页面缩略图：每页渲染到离屏 canvas（宽度 120px，高度按比例计算），保存为 dataURL 或直接 append canvas
- [x] 2.2 缩略图纵向排列在预览栏中，每个缩略图宽度 120px，左右居中，下方留 4px 间距
- [x] 2.3 当前页缩略图高亮：边框 `2px solid var(--color-primary)`，非当前页边框透明

## 3. 鼠标热区触发逻辑

- [x] 3.1 在 `PdfViewerPage.vue` 的 `onMouseMove` 中增加左边缘检测：当 `event.clientX <= 30` 时设置 `previewVisible = true`
- [x] 3.2 监听预览栏组件的 `mouseleave` 事件，设置 1 秒定时器后隐藏（`previewVisible = false`）；若 `mouseenter` 在定时器触发前发生则取消定时器
- [x] 3.3 窗口宽度 < 800px 时跳过热区检测，保持 `previewVisible = false`

## 4. 集成与跳转

- [x] 4.1 在 `PdfViewerPage.vue` 中引入 `PagePreviewBar` 组件，传递 `pdfDoc`、`currentPage`、`totalPages`、`visible` props
- [x] 4.2 实现 `onNavigateTo(pageNum)` 回调：调用 `rendererRef.value.renderPage(pageNum)` 跳转，随后设置 `previewVisible = false`
- [x] 4.3 仅在 `loadingState === 'loaded'` 时渲染 `PagePreviewBar` 组件（loading 和 error 状态下不渲染）
- [x] 4.4 将 `PdfRenderer` 的 `pdfDoc` 内部对象暴露给父组件（通过 `defineExpose` 或 emit），供 `PagePreviewBar` 使用

## 5. 验证

- [ ] 5.1 多页 PDF：确认左边缘触发展示、缩略图正确渲染、滚动流畅、点击跳转准确
- [ ] 5.2 单页 PDF：确认预览栏仍可显示且仅有 1 个缩略图
- [ ] 5.3 移动端/窄窗口：确认窗口宽度 < 800px 时预览栏不触发
- [ ] 5.4 与现有控件兼容：键盘翻页后预览栏高亮更新；触控滑动不影响桌面端预览栏功能
- [x] 5.5 构建测试：`npm run build` 无报错，dist 产物正常
