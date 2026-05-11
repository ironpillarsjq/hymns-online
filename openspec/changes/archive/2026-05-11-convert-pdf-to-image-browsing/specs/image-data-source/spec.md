## ADDED Requirements

### Requirement: 从 /public/data 目录发现图片文件夹

系统 SHALL 在构建时从 `/public/data/<网站标题>/` 的子目录中发现包含图片文件的文件夹。Vite SHALL 自动将 `/public/data/` 中的所有文件拷贝到输出目录。

#### Scenario: 单个含图片的文件夹
- **WHEN** 项目中存在 `/public/data/poems/spring/01.jpg`、`/public/data/poems/spring/02.jpg`、`/public/data/poems/spring/03.jpg`
- **THEN** 所有图片文件 SHALL 出现在构建输出中，分别为 `dist/data/poems/spring/01.jpg`、`dist/data/poems/spring/02.jpg`、`dist/data/poems/spring/03.jpg`

#### Scenario: 多个文件夹
- **WHEN** `/public/data/poems/` 包含子目录 `spring/`（3 张图片）和 `summer/`（5 张图片）
- **THEN** 两个文件夹及其图片 SHALL 都存在于构建输出中

#### Scenario: 无数据目录
- **WHEN** `/public/data/` 目录不存在或不包含含图片的子目录
- **THEN** 构建 SHALL 正常完成，网站 SHALL 显示空状态提示信息

### Requirement: 构建时生成图片文件夹清单

系统 SHALL 在构建时生成 `manifest.json`，列出所有发现的图片文件夹、展示名称、路径、图片数量以及排序后的图片文件名。支持的图片格式：`.jpg`、`.jpeg`、`.png`、`.webp`、`.gif`、`.bmp`。

#### Scenario: 清单结构
- **WHEN** `/public/data/poems/spring/` 包含 `01.jpg`、`02.jpg`、`03.png`
- **THEN** 清单 SHALL 包含一个条目，字段为：
  - `folderName`："spring"
  - `displayName`：由文件夹名推导
  - `path`："data/poems/spring"
  - `imageCount`：3
  - `images`：["01.jpg", "02.jpg", "03.png"]

#### Scenario: 中文文件夹名
- **WHEN** 文件夹名为 "春天"
- **THEN** `displayName` SHALL 为 "春天"（中文保留原名）

#### Scenario: 英文连字符文件夹名
- **WHEN** 文件夹名为 "quiet-night"
- **THEN** `displayName` SHALL 为 "Quiet Night"（连字符替换为空格，单词首字母大写）

#### Scenario: 网站标题取自目录名
- **WHEN** 数据目录为 `/public/data/poems/`
- **THEN** 清单中 `siteTitle` 字段的值 SHALL 为 "poems"（取自子目录名）

### Requirement: 数字文件名排序

系统 SHALL 将每个文件夹内的图片文件名按其开头的数字进行数值排序。不含前导数字的文件 SHALL 按字母序排列并置于数值排序文件之后。

#### Scenario: 数值排序
- **WHEN** 文件夹包含 `2.jpg`、`10.jpg`、`1.jpg`
- **THEN** images 数组 SHALL 排序为 ["1.jpg", "2.jpg", "10.jpg"]（非字典序 "1.jpg", "10.jpg", "2.jpg"）

#### Scenario: 零填充文件名
- **WHEN** 文件夹包含 `001.jpg`、`002.jpg`、`010.jpg`
- **THEN** images 数组 SHALL 排序为 ["001.jpg", "002.jpg", "010.jpg"]

#### Scenario: 混合非数字文件名
- **WHEN** 文件夹包含 `01.jpg`、`cover.jpg`、`02.jpg`
- **THEN** images 数组 SHALL 排序为 ["01.jpg", "02.jpg", "cover.jpg"]

### Requirement: 全静态资源服务

构建后的站点 SHALL 为全静态的 HTML、CSS、JS 和图片文件集合，无服务端运行时。所有图片文件路径 SHALL 使用相对 URL，确保 GitHub Pages 兼容。

#### Scenario: 相对资源路径
- **WHEN** 阅读器在运行时加载图片
- **THEN** 图片的 URL SHALL 为相对于站点根目录的路径（如 `data/poems/spring/01.jpg`）
