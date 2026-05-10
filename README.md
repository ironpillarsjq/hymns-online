# Hymns Online

在线诗歌 PDF 阅读器 —— 全屏分页浏览，类似 PPT 播放体验。

## 使用方式

### 添加诗歌 PDF

1. 在 `public/data/` 下创建以网站标题命名的文件夹（如 `public/data/my-poems/`）
2. 将 PDF 文件放入该文件夹
3. PDF 文件名将自动作为列表中的展示名称（中文文件名直接去扩展名，英文连字符转空格并首字母大写）

示例目录结构：

```
public/data/my-poems/
  ├── 春晓.pdf
  ├── 静夜思.pdf
  └── quiet-night-thought.pdf
```

### 本地开发

```bash
npm install
npm run dev
```

### 构建与部署

```bash
npm run build    # 输出至 dist/
npm run preview  # 本地预览构建产物
```

构建产物 `dist/` 为纯静态文件，可直接部署至 GitHub Pages 或任意静态托管服务。
