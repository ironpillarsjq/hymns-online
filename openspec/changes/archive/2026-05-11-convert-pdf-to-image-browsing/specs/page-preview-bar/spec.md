## MODIFIED Requirements

### Requirement: 预览栏展示所有页面缩略图

系统 SHALL 在预览栏中以纵向列表形式渲染当前图片文件夹中所有图片的缩略图，使用原生 `<img>` 元素配合 CSS 缩放（非 canvas 渲染），支持滚动浏览。

#### Scenario: 多页图片集显示缩略图列表
- **WHEN** 图片文件夹包含 10 张图片且预览栏已显示
- **THEN** 预览栏内 SHALL 渲染 10 个缩略图，每个宽度为 120px，高度按图片原始比例通过 CSS `object-fit` 自动缩放

#### Scenario: 预览栏可滚动
- **WHEN** 预览栏中的缩略图总高度超过视口高度
- **THEN** 预览栏 SHALL 支持垂直滚动（滚轮或拖拽滚动条），不显示滚动条以避免遮挡

#### Scenario: 单张图片显示一个缩略图
- **WHEN** 图片文件夹仅包含 1 张图片
- **THEN** 预览栏仍 SHALL 显示该唯一图片的缩略图

#### Scenario: 缩略图使用图片原始 URL
- **WHEN** 图片文件夹中的图片路径为 `data/poems/spring/01.jpg`
- **THEN** 预览栏中对应缩略图 SHALL 使用同一 URL（`data/poems/spring/01.jpg`），通过 CSS 限制宽度为 120px 实现缩略图效果
