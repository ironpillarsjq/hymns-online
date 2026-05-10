## MODIFIED Requirements

### Requirement: PDF 列表展示

系统 SHALL 以分组网格布局展示所有 PDF 条目。每 100 个条目归入一个带浅色边框的卡片框内，框内按钮水平排列、自动换行。框之间以响应式网格排列。

#### Scenario: 多个 PDF 分组显示
- **WHEN** manifest 包含 3 个 PDF 条目
- **THEN** 目录页 SHALL 显示 1 个框，框内包含 3 个可点击的按钮，每个按钮显示 PDF 的展示名称

#### Scenario: 空状态
- **WHEN** manifest 包含 0 个 PDF 条目
- **THEN** 目录页 SHALL 显示友好提示信息，告知用户尚无诗歌文件，并附上添加文件的操作指引

#### Scenario: 加载状态
- **WHEN** manifest JSON 正在请求加载中
- **THEN** 目录页 SHALL 显示加载指示器

## ADDED Requirements

### Requirement: 每 100 个条目分为一组

系统 SHALL 将 PDF 列表按每 100 个为一批进行分组，每组渲染为一个独立的卡片框。

#### Scenario: 250 个条目分为 3 组
- **WHEN** manifest 包含 250 个 PDF 条目
- **THEN** 目录页 SHALL 显示 3 个框：前两个框各含 100 个按钮，第三个框含 50 个按钮

#### Scenario: 100 个条目显示 1 个框
- **WHEN** manifest 包含正好 100 个 PDF 条目
- **THEN** 目录页 SHALL 显示 1 个框，框内包含 100 个按钮

#### Scenario: 少于 100 个条目
- **WHEN** manifest 包含 45 个 PDF 条目
- **THEN** 目录页 SHALL 显示 1 个框，框内包含 45 个按钮

### Requirement: 响应式框列数

系统 SHALL 根据视口宽度调整框的列数，使用 CSS Grid 响应式布局。

#### Scenario: 大屏显示 3 列
- **WHEN** 视口宽度 >= 1200px
- **THEN** 框 SHALL 以 3 列网格排列

#### Scenario: 中屏显示 2 列
- **WHEN** 视口宽度在 768px ~ 1199px 之间
- **THEN** 框 SHALL 以 2 列网格排列

#### Scenario: 小屏显示 1 列
- **WHEN** 视口宽度 < 768px
- **THEN** 框 SHALL 以 1 列排列（框占满宽度）

### Requirement: 框内按钮换行布局

系统 SHALL 在框内使用弹性换行布局排列按钮，根据视口宽度调整每行按钮数量。

#### Scenario: 大屏每行 10 个按钮
- **WHEN** 视口宽度 >= 1200px
- **THEN** 框内每行 SHALL 显示 10 个按钮（`flex: 0 0 calc(10% - gap)`）

#### Scenario: 中屏每行 10 个按钮
- **WHEN** 视口宽度在 768px ~ 1199px 之间
- **THEN** 框内每行 SHALL 显示 10 个按钮

#### Scenario: 小屏每行 5 个按钮
- **WHEN** 视口宽度 < 768px
- **THEN** 框内每行 SHALL 显示 5 个按钮（`flex: 0 0 calc(20% - gap)`）

### Requirement: 框视觉样式

每个分组框 SHALL 使用浅色背景和浅色边框，与页面整体风格协调。框内应有适当的标题标注（如 "1 — 100"）。

#### Scenario: 框外观
- **WHEN** 框渲染时
- **THEN** 框 SHALL 包含：浅色背景（`--color-very-light`）、浅色边框（`1px solid --color-light`）、圆角 8px、框内内边距、顶部标题（如 "1 — 100"）

### Requirement: 按钮尺寸

每个 PDF 跳转按钮 SHALL 尺寸小巧，文字字号缩小，适合大量条目场景。

#### Scenario: 按钮样式
- **WHEN** 按钮渲染时
- **THEN** 按钮 SHALL 具备以下样式：字号 0.85rem、padding 0.4em 0.6em、文字居中、cursor pointer、hover 时背景色变化
