## ADDED Requirements

### Requirement: 全屏按钮显示与隐藏

系统 SHALL 在屏幕顶部中央提供一个圆形全屏切换按钮。按钮在鼠标光标靠近屏幕顶部时显示，光标离开该区域后隐藏。按钮的显示与隐藏 SHALL 带有平滑的淡入淡出过渡效果。

#### Scenario: 鼠标靠近时显示按钮
- **WHEN** 用户鼠标光标进入屏幕顶部 60px 范围内
- **THEN** 全屏按钮 SHALL 以淡入动画显示，opacity 从 0 过渡到 1

#### Scenario: 鼠标离开后隐藏按钮
- **WHEN** 用户鼠标光标离开屏幕顶部 60px 范围
- **THEN** 全屏按钮 SHALL 以淡出动画隐藏，opacity 从 1 过渡到 0

#### Scenario: 浏览器不支持全屏时隐藏按钮
- **WHEN** 浏览器不支持 Fullscreen API（`document.fullscreenEnabled` 为 false）
- **THEN** 全屏按钮 SHALL 始终隐藏（`display: none`）

### Requirement: 全屏切换功能

系统 SHALL 在用户点击全屏按钮时，调用浏览器 Fullscreen API 进入或退出全屏模式。按钮图标 SHALL 根据当前全屏状态显示进入全屏或退出全屏的图标。

#### Scenario: 点击按钮进入全屏
- **WHEN** 用户点击全屏按钮且当前未处于全屏模式
- **THEN** 系统 SHALL 调用 `document.documentElement.requestFullscreen()` 进入全屏模式

#### Scenario: 点击按钮退出全屏
- **WHEN** 用户点击全屏按钮且当前处于全屏模式
- **THEN** 系统 SHALL 调用 `document.exitFullscreen()` 退出全屏模式

### Requirement: 进入全屏时短暂显示按钮

系统 SHALL 在用户刚进入全屏模式时短暂显示全屏按钮，作为状态确认，随后自动隐藏。

#### Scenario: 进入全屏后短暂显示
- **WHEN** 浏览器进入全屏模式（通过按钮或其他方式）
- **THEN** 全屏按钮 SHALL 显示 2 秒后自动淡出隐藏

#### Scenario: 短暂显示期间被鼠标交互打断
- **WHEN** 全屏按钮正在短暂显示中，且用户鼠标移入按钮区域
- **THEN** 自动隐藏的定时器 SHALL 被取消，按钮保持显示直到用户鼠标离开

### Requirement: 按钮视觉样式

全屏按钮 SHALL 为圆形（直径 48px），位于屏幕顶部中央，背景色为主色，图标为白色。

#### Scenario: 按钮基础样式
- **WHEN** 按钮处于可见状态
- **THEN** 按钮 SHALL 为直径 48px 的圆形，水平居中于视口，垂直位置距顶部 16px，背景色为 `--color-primary`（#626C83），图标颜色为 `--color-background`（#FFFFFF）

#### Scenario: 按钮 z-index
- **WHEN** 按钮渲染时
- **THEN** 按钮的 z-index SHALL 足够高（如 9999），确保始终在所有页面内容之上
