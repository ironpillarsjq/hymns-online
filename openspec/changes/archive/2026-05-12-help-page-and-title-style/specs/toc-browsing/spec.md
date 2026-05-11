## MODIFIED Requirements

### Requirement: 网站标题展示

目录页 SHALL 根据路由参数 `siteName` 对应站点的 `title` 显示页面标题，HTML 文档标题 SHALL 同步反映该标题。标题字体 SHALL 较大（建议 `font-size: 1.8rem`），并 SHALL 在页面中水平居中，与全屏按钮居中对齐。

#### Scenario: 标题取自站点参数
- **WHEN** 用户访问 `/site/712`，manifest 中 712 站点的 `title` 为 "712"
- **THEN** 页面标题 SHALL 显示 "712"，document.title SHALL 为 "712"

#### Scenario: 中文站点标题
- **WHEN** 用户访问 `/site/附录`，manifest 中站点的 `title` 为 "附录"
- **THEN** 页面标题 SHALL 显示 "附录"

#### Scenario: 标题字体更大
- **WHEN** 目录页标题渲染时
- **THEN** 标题文字 SHALL 使用 `font-size: 1.8rem`，大于正文文字

#### Scenario: 标题水平居中
- **WHEN** 目录页标题渲染时
- **THEN** 标题 SHALL 水平居中（`text-align: center`）
