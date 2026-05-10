## MODIFIED Requirements

### Requirement: 网格布局大组间响应式列数

系统 SHALL 使用 CSS Grid 响应式排列大组。列宽始终保持与满列时一致（3 列时每列 `(100% - 2rem) / 3`），内容不足时 `auto-fit` 折叠空列，剩余列居中。

#### Scenario: 大屏 3 列
- **WHEN** 视口宽度 >= 1200px
- **THEN** 大组 SHALL 以最多 3 列网格排列（`repeat(auto-fit, calc((100% - 2rem) / 3))`），`justify-content: center`

#### Scenario: 中屏 2 列
- **WHEN** 视口宽度在 768px ~ 1199px 之间
- **THEN** 大组 SHALL 以最多 2 列网格排列（`repeat(auto-fit, calc((100% - 1rem) / 2))`），`justify-content: center`

#### Scenario: 列宽不随列数减少而变宽
- **WHEN** 大组数量少于最大列数（如 1200px+ 屏幕仅 2 个大组）
- **THEN** 每列宽度 SHALL 与 3 列满排时相同，不因空列消失而拉伸填满

#### Scenario: 大组不足时居中
- **WHEN** 大组数量少于最大列数
- **THEN** 有效列 SHALL 在页面内水平居中