## ADDED Requirements

### Requirement: 布局切换按钮

系统 SHALL 在屏幕右侧固定位置提供一个布局切换按钮，允许用户在列表布局和网格布局之间切换。

#### Scenario: 按钮位置
- **WHEN** 目录页渲染时
- **THEN** 布局切换按钮 SHALL 位于屏幕右侧（`position: fixed; right: 16px; top: 50%`），z-index 为 15，使用项目主题色

#### Scenario: 从列表切换到网格
- **WHEN** 当前为列表布局，用户点击切换按钮
- **THEN** 目录页 SHALL 切换到网格布局，按钮图标 SHALL 更新为列表图标（表示"点击切换到列表"）

#### Scenario: 从网格切换到列表
- **WHEN** 当前为网格布局，用户点击切换按钮
- **THEN** 目录页 SHALL 切换到列表布局，按钮图标 SHALL 更新为网格图标（表示"点击切换到网格"）

### Requirement: 默认布局自动选择

系统 SHALL 根据 PDF 文件数量自动选择初始布局模式。

#### Scenario: 少于 30 个文件默认列表
- **WHEN** manifest 包含 25 个 PDF 条目且用户未曾手动切换
- **THEN** 目录页 SHALL 默认以列表布局显示

#### Scenario: 等于 30 个文件默认网格
- **WHEN** manifest 包含 30 个 PDF 条目且用户未曾手动切换
- **THEN** 目录页 SHALL 默认以网格布局显示

#### Scenario: 超过 30 个文件默认网格
- **WHEN** manifest 包含 500 个 PDF 条目且用户未曾手动切换
- **THEN** 目录页 SHALL 默认以网格布局显示

### Requirement: 手动切换覆盖自动选择

用户手动切换布局后，自动选择应被覆盖，直到用户再次手动操作或页面刷新。

#### Scenario: 手动切换后保持
- **WHEN** 用户在小量文件场景下手动切换到网格布局
- **THEN** 目录页 SHALL 保持网格布局，不再根据文件数量自动变更

#### Scenario: 刷新后恢复自动选择
- **WHEN** 用户刷新页面（重新加载）
- **THEN** 布局模式 SHALL 重新根据文件数量自动选择
