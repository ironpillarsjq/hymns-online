## 1. 数据分组

- [x] 1.1 在 `TocPage.vue` 中添加 `computed` 属性 `chunkedPdfs`，将 `manifest.pdfs` 按每 100 个分割为二维数组

## 2. 模板重构

- [x] 2.1 将原来的 `<ul class="toc-list">` 替换为 `<div class="toc-grid">`，外层 v-for 遍历每个 chunk，生成 `.toc-chunk` 框
- [x] 2.2 每个框内使用 `v-for` 渲染按钮，绑定 `@click="openPdf(pdf.path)"`，显示 `pdf.displayName`

## 3. 响应式样式

- [x] 3.1 外层 Grid 布局：`.toc-grid` 使用 `display: grid; gap: 1rem`，通过 `@media` 设置 3 列(>=1200px)、2 列(768~1199px)、1 列(<768px)
- [x] 3.2 框内 Flex 布局：`.toc-chunk` 使用 `display: flex; flex-wrap: wrap; gap: 4px`，按钮在大屏 `flex: 0 0 calc(10% - 4px)`，小屏 `flex: 0 0 calc(20% - 4px)`
- [x] 3.3 框样式：背景 `--color-very-light`，边框 `1px solid --color-light`，圆角 8px，内边距
- [x] 3.4 按钮样式缩小：字号 0.85rem，padding 0.4em 0.6em，hover 效果

## 4. 验证

- [x] 4.1 运行 `npm run build` 验证构建无报错
