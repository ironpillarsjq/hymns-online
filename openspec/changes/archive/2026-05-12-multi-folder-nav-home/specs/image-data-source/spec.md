## MODIFIED Requirements

### Requirement: 从 /public/data 目录发现图片文件夹

系统 SHALL 在构建时遍历 `/public/data/` 下的所有子目录（而非仅第一个），每个子目录作为一个独立站点，读取其下的图片文件夹。

#### Scenario: 多个数据目录站点
- **WHEN** 项目中存在 `/public/data/712/`、`/public/data/853/`、`/public/data/附录/`
- **THEN** 所有三个站点及其图片 SHALL 出现在构建输出中

#### Scenario: 无数据目录
- **WHEN** `/public/data/` 目录不存在或不包含含图片的子目录
- **THEN** 构建 SHALL 正常完成，manifest SHALL 包含空的 `sites` 数组

### Requirement: 构建时生成图片文件夹清单

系统 SHALL 在构建时生成 `manifest.json`，采用多站点数组格式。每个站点包含 `name`（目录名，用于路由）、`title`（目录名）、`path`（数据相对路径）和 `folders` 数组。支持的图片格式：`.jpg`、`.jpeg`、`.png`、`.webp`、`.gif`、`.bmp`。

#### Scenario: 多站点清单结构
- **WHEN** `public/data/` 下存在子目录 `712/` 和 `853/`
- **THEN** manifest SHALL 为：
  ```json
  {
    "sites": [
      { "name": "712", "title": "712", "path": "data/712", "folders": [...] },
      { "name": "853", "title": "853", "path": "data/853", "folders": [...] }
    ]
  }
  ```

#### Scenario: 站点内文件夹清单
- **WHEN** `public/data/712/song1/` 包含 `01.jpg`、`02.jpg`
- **THEN** 712 站点的 `folders` 数组 SHALL 包含 `{ "path": "data/712/song1", ... }`
