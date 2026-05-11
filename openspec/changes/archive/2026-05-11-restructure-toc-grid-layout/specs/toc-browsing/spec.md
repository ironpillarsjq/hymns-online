## MODIFIED Requirements

### Requirement: 网格布局小组内排列

系统 SHALL 在小组内水平排列条目按钮，每组最多 10 个条目，每行显示 5 个按钮，超出换行。

#### Scenario: 每行 5 个按钮
- **WHEN** 视口宽度为任意尺寸
- **THEN** 小组内每行 SHALL 显示最多 5 个按钮（`flex: 0 0 calc((100% - 8px) / 5)`），条目总数 ≤ 10 时占 2 行

#### Scenario: 小组内条目不足 5 个
- **WHEN** 小组包含 3 个条目
- **THEN** 该行 SHALL 仅显示 3 个按钮，后续位置留空

### Requirement: 网格布局大组内小组纵向排列

系统 SHALL 在大组内将小组纵向排列，保持小组之间垂直堆叠（单列），替代原有的多列排列。

#### Scenario: 小组纵向排列
- **WHEN** 大组包含多个小组
- **THEN** 小组 SHALL 在垂直方向依次堆叠（`flex-direction: column`），小组之间不出现横向并排

### Requirement: 网格布局按钮样式

网格布局的条目按钮 SHALL 尺寸适合 5 列排列。按钮首条目 SHALL 字体加粗以标识小组边界。

#### Scenario: 按钮基础样式
- **WHEN** 网格布局按钮渲染时
- **THEN** 按钮 SHALL 满足：字号 0.8rem、padding 0.4em 0.5em、文字居中、white-space: nowrap、cursor pointer、hover 时背景变色

#### Scenario: 首条目加粗
- **WHEN** 网格布局中小组成员按钮的第一项渲染时
- **THEN** 该按钮字体 SHALL 加粗（`font-weight: 700`），其余按钮使用正常字重，以区分小组边界

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
