## MODIFIED Requirements

### Requirement: PDF 列表展示

系统 SHALL 支持列表和网格两种布局模式展示 PDF 条目。当文件数量 < 30 时默认使用列表布局，>= 30 时默认使用网格布局。用户可通过右侧切换按钮手动切换模式。

#### Scenario: 多个 PDF 显示
- **WHEN** manifest 包含 3 个 PDF 条目
- **THEN** 目录页 SHALL 默认以列表布局显示 3 个可点击的条目，每个条目显示 PDF 的展示名称

#### Scenario: 空状态
- **WHEN** manifest 包含 0 个 PDF 条目
- **THEN** 目录页 SHALL 显示友好提示信息，告知用户尚无诗歌文件，并附上添加文件的操作指引

#### Scenario: 加载状态
- **WHEN** manifest JSON 正在请求加载中
- **THEN** 目录页 SHALL 显示加载指示器

## ADDED Requirements

### Requirement: 列表布局

系统 SHALL 提供列表布局模式，所有 PDF 条目纵向排列，每行一个条目。

#### Scenario: 列表布局每行一个条目
- **WHEN** 用户处于列表布局模式且 manifest 包含 15 个条目
- **THEN** 目录页 SHALL 显示 15 行，每行一个 PDF 条目，行间有适当间距

#### Scenario: 列表布局可滚动
- **WHEN** 列表条目总高度超过屏幕可视区域
- **THEN** 列表 SHALL 支持垂直滚动

#### Scenario: 名称超过 20 字截断
- **WHEN** PDF 展示名称长度超过 20 个字符
- **THEN** 列表条目 SHALL 显示前 20 个字符 + 省略号（"..."）

#### Scenario: 名称不超过 20 字完整显示
- **WHEN** PDF 展示名称长度 <= 20 个字符
- **THEN** 列表条目 SHALL 显示完整名称

### Requirement: 网格布局层级分组

系统 SHALL 在网格布局模式下按层级分组：每 10 个 PDF 条目为"小组"，每 10 个小组为"大组"。

#### Scenario: 120 个条目分组
- **WHEN** manifest 包含 120 个 PDF 条目
- **THEN** 目录页 SHALL 显示 12 个小组、1 个大组（不满 10 个小组时仍独立为大组）或 2 个大组

#### Scenario: 小组内 10 个条目
- **WHEN** manifest 包含第 1 ~ 10 个 PDF 条目
- **THEN** 它们 SHALL 归入第 1 个小组

#### Scenario: 大组内 10 个小组
- **WHEN** 存在第 1 ~ 10 个小组
- **THEN** 它们 SHALL 归入第 1 个大组

### Requirement: 网格布局小组内排列

系统 SHALL 在小组内水平排列条目按钮，根据屏幕宽度调整每行显示的按钮数量。

#### Scenario: 大屏每行 10 个按钮
- **WHEN** 视口宽度 >= 1200px
- **THEN** 小组内每行 SHALL 显示 10 个按钮（`flex: 0 0 calc(10% - gap)`）

#### Scenario: 小屏每行 5 个按钮
- **WHEN** 视口宽度 < 1200px
- **THEN** 小组内每行 SHALL 显示 5 个按钮（`flex: 0 0 calc(20% - gap)`）

### Requirement: 网格布局大组间响应式列数

系统 SHALL 使用 CSS Grid 响应式排列大组，根据屏幕宽度调整列数。

#### Scenario: 大屏 3 列
- **WHEN** 视口宽度 >= 1200px
- **THEN** 大组 SHALL 以 3 列网格排列

#### Scenario: 中屏 2 列
- **WHEN** 视口宽度在 768px ~ 1199px 之间
- **THEN** 大组 SHALL 以 2 列网格排列

#### Scenario: 小屏 1 列
- **WHEN** 视口宽度 < 768px
- **THEN** 大组 SHALL 以 1 列排列

#### Scenario: 大组不足填满行时居中
- **WHEN** 大组数量少于当前列数（如 2 个大组在 3 列布局下）
- **THEN** 大组 SHALL 在行内居中显示

### Requirement: 网格布局名称截断

网格布局中的条目按钮名称超过 4 个字符时 SHALL 截断显示。

#### Scenario: 名称超过 4 字截断
- **WHEN** PDF 展示名称长度超过 4 个字符
- **THEN** 按钮 SHALL 显示前 4 个字符 + 省略号

#### Scenario: 名称不超过 4 字完整显示
- **WHEN** PDF 展示名称长度 <= 4 个字符
- **THEN** 按钮 SHALL 显示完整名称

### Requirement: 网格布局按钮样式

网格布局的条目按钮 SHALL 尺寸小巧，适合 300 ~ 1200 条目的密集排列。

#### Scenario: 按钮基础样式
- **WHEN** 网格布局按钮渲染时
- **THEN** 按钮 SHALL 满足：字号 0.65rem、padding 0.3em 0.5em、文字居中、white-space: nowrap、cursor pointer、hover 时背景变色

### Requirement: 全局可滚动

目录页整体 SHALL 支持垂直滚动（`overflow-y: auto`），确保所有布局模式下内容超出屏幕高度时可浏览。
