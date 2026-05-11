## ADDED Requirements

### Requirement: 帮助页面路由

系统 SHALL 提供帮助页面，当用户访问 `#/help` 路由时显示。

#### Scenario: 导航至帮助页面
- **WHEN** 用户访问 hash 路由 `#/help`
- **THEN** 系统 SHALL 显示帮助页面

### Requirement: 帮助内容来源

系统 SHALL 从 `public/help.md` 文件加载帮助内容，该文件为 UTF-8 编码的 Markdown 格式。

#### Scenario: 加载帮助文档
- **WHEN** 帮助页面初始化
- **THEN** 系统 SHALL 通过 HTTP GET 请求加载 `public/help.md`

#### Scenario: 帮助文档加载失败
- **WHEN** `public/help.md` 不存在或网络错误
- **THEN** 帮助页面 SHALL 显示错误提示信息

#### Scenario: 帮助文档加载中
- **WHEN** `public/help.md` 正在加载中
- **THEN** 帮助页面 SHALL 显示加载指示器

### Requirement: Markdown 转 HTML 渲染

系统 SHALL 将加载到的 Markdown 内容转换为 HTML 并渲染在帮助页面中。转换规则如下：

- `#` 标题 → `<h1>`
- `##` 标题 → `<h2>`
- `###` 标题 → `<h3>`
- `**粗体**` → `<strong>`
- `[文字](url)` → `<a>` 链接（外部链接新标签打开）
- `- ` 开头的无序列表项 → `<ul> + <li>`
- 连续列表项归入同一 `<ul>`
- 空行分隔段落为 `<p>`
- 联系邮箱格式自动转为 `mailto:` 链接

#### Scenario: 渲染标题
- **WHEN** Markdown 内容包含 `## 内容浏览页面`
- **THEN** 输出 SHALL 为 `<h2>内容浏览页面</h2>`

#### Scenario: 渲染列表
- **WHEN** Markdown 内容包含 `- 如何翻页`、`- 如何使用预览栏`
- **THEN** 输出 SHALL 为 `<ul><li>如何翻页</li><li>如何使用预览栏</li></ul>`

#### Scenario: 渲染链接
- **WHEN** Markdown 内容包含 `[邮箱](mailto:example@example.com)`
- **THEN** 输出 SHALL 为 `<a href="mailto:example@example.com">邮箱</a>`

#### Scenario: 渲染粗体
- **WHEN** Markdown 内容包含 `**侵权联系删除**`
- **THEN** 输出 SHALL 为 `<strong>侵权联系删除</strong>`

### Requirement: 帮助页面样式

帮助页面的内容区域 SHALL 使用与项目一致的样式变量（背景白色 `#FFFFFF`，文字颜色 `#797979`），内容区域最大宽度 800px，水平居中。标题使用主色 `#626C83`。

#### Scenario: 帮助页面基础样式
- **WHEN** 帮助页面渲染完成
- **THEN** 背景 SHALL 为白色 `#FFFFFF`，文字颜色 SHALL 为 `#797979`

#### Scenario: 内容区域宽度
- **WHEN** 视口宽度大于 800px
- **THEN** 内容区域宽度 SHALL 为 800px，水平居中

#### Scenario: 小屏幕适配
- **WHEN** 视口宽度小于 800px
- **THEN** 内容区域 SHALL 占满宽度并保留适当左右内边距（16px）
