## ADDED Requirements

### Requirement: 全局顶部导航栏

系统 SHALL 在所有页面顶部显示导航栏，包含主页链接和所有站点名称链接。当前所在页面链接 SHALL 高亮显示。

#### Scenario: 导航栏显示所有站点
- **WHEN** manifest 包含站点 "712"、"853"、"附录"
- **THEN** 导航栏 SHALL 显示 "主页"、"712"、"853"、"附录" 四个链接

#### Scenario: 当前页面高亮
- **WHEN** 用户正在浏览站点 "712" 的目录页
- **THEN** 导航栏中 "712" 链接 SHALL 高亮或标记为当前

#### Scenario: 点击导航栏链接跳转
- **WHEN** 用户在任意页面点击导航栏中的 "853"
- **THEN** 浏览器 SHALL 导航至 `/site/853`

#### Scenario: 点击主页链接
- **WHEN** 用户点击导航栏中的 "主页"
- **THEN** 浏览器 SHALL 导航至 `/`（主页）
