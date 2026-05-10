## 1. 全局颜色变量定义

- [x] 1.1 在 `App.vue` 中定义 CSS 变量（--color-primary, --color-secondary, --color-light, --color-very-light, --color-background, --color-text, --color-text-light, --color-error）
- [x] 1.2 更新 `App.vue` 全局背景色为 `#FFFFFF`，文字色为 `#797979`

## 2. 目录页样式更新

- [x] 2.1 更新 `TocPage.vue` 页面背景为白色
- [x] 2.2 更新目录标题颜色为 `--color-primary`
- [x] 2.3 更新列表项背景为 `--color-very-light`，边框为 `--color-light`
- [x] 2.4 更新列表项 hover 效果的边框颜色为 `--color-primary`
- [x] 2.5 更新文字颜色为 `--color-text`

## 3. PDF 阅读器样式更新

- [x] 3.1 更新 `PdfViewerPage.vue` 页面背景为白色
- [x] 3.2 保持 PDF 渲染区域（canvas 容器）背景为深色 `#0d0d1a`
- [x] 3.3 更新加载状态和错误状态的文字颜色为 `--color-text-light`

## 4. 组件样式更新

- [x] 4.1 更新 `NavControls.vue` 按钮背景为 `--color-primary`
- [x] 4.2 更新 `PageIndicator.vue` 浮层背景为半透明深色（保持可读性）
- [x] 4.3 更新 `LoadingSpinner.vue` 颜色为主题色
- [x] 4.4 更新错误文字颜色为 `--color-error`

## 5. 验证与测试

- [x] 5.1 运行 `npm run dev` 本地预览颜色效果
- [x] 5.2 检查所有页面（TOC、PDF 阅读器）的颜色一致性
- [x] 5.3 检查 hover、active 等交互状态的视觉反馈
- [x] 5.4 运行 `npm run build` 确保构建正常