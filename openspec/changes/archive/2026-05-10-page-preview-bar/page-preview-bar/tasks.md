## 1. 实现预览栏自动滚动

- [ ] 1.1 在 `PagePreviewBar.vue` 中添加 `watch` 监听 `currentPage` 变化
- [ ] 1.2 在 watch 回调中使用 `nextTick` 等待 DOM 更新，然后通过 DOM 查询找到当前页缩略图元素
- [ ] 1.3 调用 `scrollIntoView({ behavior: 'smooth', block: 'nearest' })` 滚动至当前页缩略图

## 2. 验证

- [ ] 2.1 运行 `npm run build` 验证构建无报错
