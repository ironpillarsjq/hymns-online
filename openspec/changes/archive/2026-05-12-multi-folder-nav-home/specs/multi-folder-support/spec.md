## ADDED Requirements

### Requirement: 多站点 manifest 结构

系统 SHALL 在 `manifest.json` 中以多站点数组格式描述所有数据文件夹，替代原有的单站点格式。

#### Scenario: 多个站点的 manifest
- **WHEN** `public/data/` 下存在子目录 `712/`、`853/`、`附录/`
- **THEN** manifest SHALL 包含 `sites` 数组，每个元素有 `name`、`title`、`path`、`folders` 字段

#### Scenario: 单站点兼容
- **WHEN** `public/data/` 下仅存在一个子目录
- **THEN** manifest SHALL 仍生成 `sites` 数组格式，包含一个元素

### Requirement: 按站点参数加载目录页

系统 SHALL 根据路由参数 `siteName` 加载对应站点的子文件夹列表并显示。

#### Scenario: 通过路由加载指定站点
- **WHEN** 用户访问 `/site/712`（或 hash 路由 `#/site/712`）
- **THEN** 目录页 SHALL 显示 712 站点的子文件夹列表，页面标题显示 "712"

#### Scenario: 站点参数无匹配
- **WHEN** 路由 `siteName` 参数在 manifest 中无匹配站点
- **THEN** 目录页 SHALL 显示错误信息

### Requirement: 图片路径依站点区分

系统 SHALL 确保不同站点的图片 URL 前缀包含各自的站点路径，避免路径冲突。

#### Scenario: 不同站点的图片路径
- **WHEN** 站点 "712" 和 "853" 都包含子文件夹 "001"
- **THEN** 712 的图片路径为 `data/712/001/01.jpg`，853 的为 `data/853/001/01.jpg`，两者不冲突
