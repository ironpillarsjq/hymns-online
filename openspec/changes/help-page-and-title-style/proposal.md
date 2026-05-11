## Why

当前目录页标题字体偏小、未与全屏按钮协同居中，视觉体验不佳。同时用户缺少使用说明入口，需要独立的帮助页面介绍网站功能和使用方法。

## What Changes

- 目录页标题字体增大，并与顶部全屏按钮一同水平居中
- 全局导航栏新增"帮助"链接
- 新增帮助页面，内容来自 `public/help.md`，渲染为 HTML 格式展示
- 帮助页面包含：网站介绍、内容浏览使用指南（翻页、预览栏、全屏模式等）、联系邮箱、侵权联系删除声明

## Capabilities

### New Capabilities
- `help-page`: 独立的帮助页面，从 `public/help.md` 加载内容并渲染为 HTML，包含网站介绍、使用指南、联系方式及侵权声明

### Modified Capabilities
- `top-navbar`: 导航栏新增"帮助"链接，点击跳转至帮助页面
- `toc-browsing`: 目录页标题字体增大，并与全屏按钮协同居中

## Impact

- 新增路由 `/help`（或 hash 路由 `#/help`）
- 新增静态文件 `public/help.md`
- 修改顶部导航栏组件（新增链接）
- 修改目录页标题样式（CSS 调整）
- 新增帮助页面组件
