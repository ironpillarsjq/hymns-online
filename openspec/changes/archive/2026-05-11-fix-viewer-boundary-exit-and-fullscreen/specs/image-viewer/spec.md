## MODIFIED Requirements

### Requirement: 全屏图片渲染

系统 SHALL 使用原生 `<img>` 元素每次渲染一张图片，图片元素 SHALL 填满父容器（`width: 100%; height: 100%`），通过 `object-fit: contain` 保持图片宽高比。窗口大小变化时通过 CSS 自动适配。

#### Scenario: 初始加载显示首张图片
- **WHEN** 图片文件夹加载到阅读器中
- **THEN** SHALL 显示该文件夹的第一张图片，`<img>` 元素填满视口，图片内容通过 `object-fit: contain` 保持宽高比

#### Scenario: 视口大小变化适配
- **WHEN** 浏览器窗口尺寸改变
- **THEN** 当前显示的图片 SHALL 通过 CSS 自动适配新的视口尺寸，保持宽高比

#### Scenario: 图片原始尺寸小于视口时放大填充
- **WHEN** 图片的原始分辨率小于浏览器视口尺寸
- **THEN** 图片 SHALL 放大至填满视口（保持宽高比），而非以原始尺寸居中显示
