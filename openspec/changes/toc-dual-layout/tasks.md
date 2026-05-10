## 1. 布局状态管理

- [ ] 1.1 添加 `layoutMode` ref（`'list' | 'grid'`）和 `userOverride` ref（`false`）
- [ ] 1.2 在 `watch(manifest)` 中根据 `pdfs.length >= 30` 设置默认布局（仅在 `!userOverride` 时生效）
- [ ] 1.3 添加 `toggleLayout()` 函数，切换 layoutMode 并设置 `userOverride = true`

## 2. 布局切换按钮

- [ ] 2.1 在模板中添加布局切换按钮，`position: fixed; right: 16px; top: 50%`
- [ ] 2.2 按钮根据 `layoutMode` 显示对应图标/文字（列表→网格图标，网格→列表图标），z-index 15

## 3. 列表布局

- [ ] 3.1 创建列表布局模板：`<ul class="toc-list">` + `<li v-for>` 遍历 `manifest.pdfs`
- [ ] 3.2 列表项样式：每行一个条目、行间距、`text-overflow: ellipsis`（20 字截断）
- [ ] 3.3 列表容器限制高度（`max-height: 100%` 或 `overflow: hidden`），超出可滚动

## 4. 网格布局数据分组

- [ ] 4.1 添加 `smallGroups` computed：将 pdfs 按每 10 个分割为一维数组
- [ ] 4.2 添加 `largeGroups` computed：将 smallGroups 按每 10 个分割为二维数组

## 5. 网格布局模板

- [ ] 5.1 大组外层 Grid 布局：`display: grid; grid-template-columns: repeat(3, 1fr)` 响应式 3/2/1 列
- [ ] 5.2 大组边框卡片：浅色背景（`--color-very-light`）、浅色边框（`--color-light`）、圆角、内边距
- [ ] 5.3 小组中层：纵向排列（`display: flex; flex-direction: column; gap: 0.25rem`），带小组序号标签
- [ ] 5.4 按钮内层：`display: flex; flex-wrap: wrap; gap: 2px`，按钮 `flex: 0 0 calc(10% - 2px)` @ 大屏, `calc(20% - 2px)` @ 小屏

## 6. 网格布局按钮样式

- [ ] 6.1 按钮尺寸缩小：字号 0.65rem，padding 0.3em 0.5em，文字居中
- [ ] 6.2 名称截断：`text-overflow: ellipsis` 控制在约 4 个字符宽度，`white-space: nowrap; overflow: hidden`
- [ ] 6.3 hover 效果：背景变 `--color-light`，边框变 `--color-primary`

## 7. 大组居中与滚动

- [ ] 7.1 大组数量 < 当前列数时，使用 `justify-content: center` 或 Grid `place-items` 居中
- [ ] 7.2 全局 `overflow-y: auto` 确保所有模式下可滚动

## 8. 构建验证

- [ ] 8.1 运行 `npm run build` 验证构建无报错
