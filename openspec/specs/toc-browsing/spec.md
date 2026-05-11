## MODIFIED Requirements

### Requirement: 图片文件夹列表展示

系统 SHALL 支持列表和网格两种布局模式展示指定站点的图片文件夹条目。每个条目显示文件夹名称和包含的图片数量。当路由参数 `siteName` 不为空时，从 manifest 中查找对应站点并显示其 `folders` 数组。当文件夹数量 < 30 时默认使用列表布局，>= 30 时默认使用网格布局。用户可通过右侧切换按钮手动切换模式。

#### Scenario: 根据路由加载站点数据
- **WHEN** 用户访问 `/site/712` 且 manifest 中 712 站点包含 3 个子文件夹
- **THEN** 目录页 SHALL 显示这 3 个子文件夹条目，而非其他站点的文件夹

#### Scenario: 多个文件夹显示
- **WHEN** manifest 包含 3 个图片文件夹条目
- **THEN** 目录页 SHALL 默认以列表布局显示 3 个可点击的条目，每个条目显示文件夹的展示名称和图片数量（如 "Spring（12张）"）

#### Scenario: 空状态
- **WHEN** manifest 包含 0 个图片文件夹条目
- **THEN** 目录页 SHALL 显示友好提示信息，告知用户尚无图片文件夹，并附上添加文件夹的操作指引

#### Scenario: 加载状态
- **WHEN** manifest JSON 正在请求加载中
- **THEN** 目录页 SHALL 显示加载指示器

### Requirement: 列表布局

系统 SHALL 提供列表布局模式，所有图片文件夹条目纵向排列，每行一个条目。

#### Scenario: 列表布局每行一个条目
- **WHEN** 用户处于列表布局模式且 manifest 包含 15 个文件夹条目
- **THEN** 目录页 SHALL 显示 15 行，每行一个文件夹条目（名称 + 图片数量），行间有适当间距

#### Scenario: 列表布局可滚动
- **WHEN** 列表条目总高度超过屏幕可视区域
- **THEN** 列表 SHALL 支持垂直滚动

#### Scenario: 名称超过 20 字截断
- **WHEN** 文件夹展示名称长度超过 20 个字符
- **THEN** 列表条目 SHALL 显示前 20 个字符 + 省略号（"..."）

#### Scenario: 名称不超过 20 字完整显示
- **WHEN** 文件夹展示名称长度 <= 20 个字符
- **THEN** 列表条目 SHALL 显示完整名称和图片数量

### Requirement: 网格布局层级分组

系统 SHALL 在网格布局模式下按层级分组：每 10 个图片文件夹条目为"小组"，每 10 个小组为"大组"。

#### Scenario: 120 个条目分组
- **WHEN** manifest 包含 120 个图片文件夹条目
- **THEN** 目录页 SHALL 显示 12 个小组，小组归入大组

#### Scenario: 小组内 10 个条目
- **WHEN** manifest 包含第 1 ~ 10 个图片文件夹条目
- **THEN** 它们 SHALL 归入第 1 个小组

#### Scenario: 大组内 10 个小组
- **WHEN** 存在第 1 ~ 10 个小组
- **THEN** 它们 SHALL 归入第 1 个大组

### Requirement: 网格布局小组内排列

系统 SHALL 在所有视口宽度下统一以每行 5 个按钮的方式在小组内水平排列条目。

#### Scenario: 所有视口统一 5 个/行
- **WHEN** 网格布局模式下渲染小组内条目按钮
- **THEN** 小组内每行 SHALL 显示 5 个按钮（`flex: 0 0 calc((100% - 8px) / 5)`）

### Requirement: 网格布局大组内小组纵向排列

系统 SHALL 在大组内将小组纵向堆叠排列。

#### Scenario: 大组内小组纵向堆积
- **WHEN** 大组内包含多个小组
- **THEN** 大组内小组 SHALL 纵向堆叠（`flex-direction: column; gap: 0.8rem`）

### Requirement: 网格布局大组间响应式列数

系统 SHALL 使用 CSS Grid 响应式排列大组。列宽始终保持与满列时一致（3 列时每列 `(100% - 2rem) / 3`），内容不足时 `auto-fit` 折叠空列，剩余列居中。

#### Scenario: 大屏 3 列
- **WHEN** 视口宽度 >= 1200px
- **THEN** 大组 SHALL 以最多 3 列网格排列（`repeat(auto-fit, calc((100% - 2rem) / 3))`），`justify-content: center`

#### Scenario: 中屏 2 列
- **WHEN** 视口宽度在 768px ~ 1199px 之间
- **THEN** 大组 SHALL 以最多 2 列网格排列（`repeat(auto-fit, calc((100% - 1rem) / 2))`），`justify-content: center`

#### Scenario: 小屏 1 列
- **WHEN** 视口宽度 < 768px
- **THEN** 大组 SHALL 以 1 列排列

#### Scenario: 列宽不随列数减少而变宽
- **WHEN** 大组数量少于最大列数（如 1200px+ 屏幕仅 2 个大组）
- **THEN** 每列宽度 SHALL 与 3 列满排时相同，不因空列消失而拉伸填满

#### Scenario: 大组不足时居中
- **WHEN** 大组数量少于最大列数
- **THEN** 有效列 SHALL 在页面内水平居中

### Requirement: 网格布局名称截断

网格布局中的条目按钮名称超过 4 个字符时 SHALL 截断显示。

#### Scenario: 名称超过 4 字截断
- **WHEN** 文件夹展示名称长度超过 4 个字符
- **THEN** 按钮 SHALL 显示前 4 个字符 + 省略号

#### Scenario: 名称不超过 4 字完整显示
- **WHEN** 文件夹展示名称长度 <= 4 个字符
- **THEN** 按钮 SHALL 显示完整名称

### Requirement: 网格布局按钮样式

网格布局的条目按钮 SHALL 尺寸小巧，适合 300 ~ 1200 条目的密集排列。每个小组中首条目 SHALL 加粗显示。

#### Scenario: 按钮基础样式
- **WHEN** 网格布局按钮渲染时
- **THEN** 按钮 SHALL 满足：字号 0.8rem、padding 0.4em 0.5em、文字居中、white-space: nowrap、cursor pointer、hover 时背景变色

#### Scenario: 首条目加粗
- **WHEN** 网格布局模式下某小组的首个条目按钮渲染时
- **THEN** 该按钮 SHALL 设置 font-weight: 700

### Requirement: 全局可滚动

目录页整体滚动，标题和内容一起滚动。

#### Scenario: 内容超出视口时整体滚动
- **WHEN** 内容超过视口
- **THEN** 页面级滚动，标题随内容滚动

#### Scenario: 内容在视口内完整显示
- **WHEN** 内容在视口内
- **THEN** 无滚动条，标题显示在顶部

### Requirement: 导航至图片阅读器

每个目录条目应可点击，将用户导航至图片阅读器页面并加载所选图片文件夹。

#### Scenario: 点击查看图片文件夹
- **WHEN** 用户点击目录中"Spring"对应的文件夹条目
- **THEN** 浏览器应导航至图片阅读器路由（`/viewer`），参数为对应的文件夹路径（如 `?folder=data/poems/spring`）

#### Scenario: 浏览器返回按钮
- **WHEN** 用户在图片阅读器页面点击浏览器返回按钮
- **THEN** 浏览器应返回至目录页

### Requirement: 网站标题展示

目录页 SHALL 根据路由参数 `siteName` 对应站点的 `title` 显示页面标题，HTML 文档标题 SHALL 同步反映该标题。

#### Scenario: 标题取自站点参数
- **WHEN** 用户访问 `/site/712`，manifest 中 712 站点的 `title` 为 "712"
- **THEN** 页面标题 SHALL 显示 "712"，document.title SHALL 为 "712"

#### Scenario: 中文站点标题
- **WHEN** 用户访问 `/site/附录`，manifest 中站点的 `title` 为 "附录"
- **THEN** 页面标题 SHALL 显示 "附录"
