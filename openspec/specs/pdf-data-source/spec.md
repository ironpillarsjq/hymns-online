## 新增需求

### 需求：从 /public/data 目录发现 PDF 文件

系统应在构建时从 `/public/data/` 的子目录中发现 PDF 文件，子目录名映射为网站标题。构建过程中，所有 `/public/data/<网站标题>/` 下的 `.pdf` 文件应由 Vite 自动拷贝至输出目录。

#### 场景：单个 PDF 文件
- **当** 项目中存在 `/public/data/poems/春晓.pdf`
- **则** 构建产物中应包含 `dist/data/poems/春晓.pdf`（由 Vite public 目录机制自动拷贝）

#### 场景：多个 PDF 文件
- **当** `/public/data/poems/` 中包含 `a.pdf`、`b.pdf`、`c.pdf`
- **则** 三个 PDF 文件均应出现在构建产物的 `dist/data/poems/` 中

#### 场景：无数据目录
- **当** `/public/data/` 目录不存在或无 PDF 文件
- **则** 构建应正常完成，网站显示空状态提示信息

### 需求：构建时生成清单文件

系统应在构建时生成 `manifest.json`，列出所有发现的 PDF 文件及其展示名称和相对路径。

#### 场景：清单结构
- **当** `/public/data/poems/` 中包含 `春晓.pdf`
- **则** manifest 应包含条目，字段为：`fileName`（"春晓"）、`displayName`（由文件名推导，如"春晓"）、`path`（"data/poems/春晓.pdf"）

#### 场景：纯中文文件名
- **当** PDF 文件名为 `静夜思.pdf`
- **则** `displayName` 应为去除扩展名后的"静夜思"

#### 场景：英文连字符文件名
- **当** PDF 文件名为 `quiet-night-thought.pdf`
- **则** `displayName` 应为 "Quiet Night Thought"（连字符替换为空格，首字母大写）

#### 场景：网站标题取自目录名
- **当** 数据目录为 `/public/data/poems/`
- **则** manifest 中 `siteTitle` 字段的值应为 "poems"（取自子目录名）

### 需求：纯静态资源服务

构建后的站点应为完全静态的 HTML、CSS、JS 和 PDF 文件集合，无服务端运行时。所有 PDF 文件路径应使用相对 URL，确保 GitHub Pages 兼容。

#### 场景：相对资源路径
- **当** 阅读器在运行时加载 PDF
- **则** PDF 的 URL 应为相对于站点根目录的路径（如 `data/poems/春晓.pdf`）
