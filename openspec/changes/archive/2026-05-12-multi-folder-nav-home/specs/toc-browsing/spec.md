## MODIFIED Requirements

### Requirement: 网站标题展示

目录页 SHALL 根据路由参数 `siteName` 对应站点的 `title` 显示页面标题，HTML 文档标题 SHALL 同步反映该标题。

#### Scenario: 标题取自站点参数
- **WHEN** 用户访问 `/site/712`，manifest 中 712 站点的 `title` 为 "712"
- **THEN** 页面标题 SHALL 显示 "712"，document.title SHALL 为 "712"

#### Scenario: 中文站点标题
- **WHEN** 用户访问 `/site/附录`，manifest 中站点的 `title` 为 "附录"
- **THEN** 页面标题 SHALL 显示 "附录"

### Requirement: 图片文件夹列表展示

系统 SHALL 支持列表和网格两种布局模式展示指定站点的图片文件夹条目。当路由参数 `siteName` 不为空时，从 manifest 中查找对应站点并显示其 `folders` 数组。

#### Scenario: 根据路由加载站点数据
- **WHEN** 用户访问 `/site/712` 且 manifest 中 712 站点包含 3 个子文件夹
- **THEN** 目录页 SHALL 显示这 3 个子文件夹条目，而非其他站点的文件夹
