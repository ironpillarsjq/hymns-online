## ADDED Requirements

### Requirement: 简洁主页

系统 SHALL 提供简洁的主页，居中显示标题和副标题。标题为固定两字文本，副标题取自外部配置文件。

#### Scenario: 主页显示
- **WHEN** 用户访问网站根路径 `/`
- **THEN** 主页 SHALL 居中显示两字标题和副标题文本

#### Scenario: 副标题来自配置文件
- **WHEN** `public/config.json` 中 `homeSubtitle` 为 "一切景语皆情语"
- **THEN** 主页副标题 SHALL 显示 "一切景语皆情语"

#### Scenario: 配置文件缺失
- **WHEN** `public/config.json` 不存在或无法加载
- **THEN** 副标题 SHALL 显示默认值或留空
