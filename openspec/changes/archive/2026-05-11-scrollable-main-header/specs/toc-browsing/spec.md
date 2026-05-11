## MODIFIED Requirements

### Requirement: 全局可滚动

系统 SHALL 确保目录页整体垂直滚动，标题和内容一起滚动，滚动过程中标题不会固定在顶部不动。

#### Scenario: 内容超出视口时整体滚动
- **WHEN** 列表或网格内容总高度超过视口高度
- **THEN** 整个目录页 SHALL 出现垂直滚动条，标题随内容一起滚动

#### Scenario: 内容在视口内完整显示
- **WHEN** 列表或网格内容总高度在视口高度内
- **THEN** 目录页 SHALL 无垂直滚动条，标题显示在页面顶部
