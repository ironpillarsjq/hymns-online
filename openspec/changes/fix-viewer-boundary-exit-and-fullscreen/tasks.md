## 1. 修复边界退出提示方向感知逻辑

- [x] 1.1 修改 `onNavPrev()`：在 `exitHintVisible` 为 true 时，仅当 `exitHintDirection === 'prev'` 才执行退出，否则清除提示并调用 `goPrev()` 正常翻页
- [x] 1.2 修改 `onNavNext()`：在 `exitHintVisible` 为 true 时，仅当 `exitHintDirection === 'next'` 才执行退出，否则清除提示并调用 `goNext()` 正常翻页
- [x] 1.3 修改 `onClick()`：在 `exitHintVisible` 为 true 时，仅当 `exitHintDirection === 'next'` 才执行退出，否则清除提示并调用 `goNext()` 正常翻页
- [x] 1.4 手动测试所有场景：末页 + 上一页按钮 → 正常翻页；首页 + 下一页按钮 → 正常翻页；末页 + 下一页按钮 → 退出；首页 + 上一页按钮 → 退出

## 2. 修复图片全屏填充

- [x] 2.1 在 `ImageRenderer.vue` 中将 `.renderer-img` 的 `max-width: 100%; max-height: 100%` 改为 `width: 100%; height: 100%`，保留 `object-fit: contain`
- [x] 2.2 手动验证：不同尺寸的图片在浏览视口中均填满可用空间，宽高比保持不变
