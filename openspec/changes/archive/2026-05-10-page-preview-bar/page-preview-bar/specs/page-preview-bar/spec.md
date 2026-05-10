## MODIFIED Requirements

### Requirement: 当前页高亮标识

系统 SHALL 在预览栏中通过视觉差异标识当前正在播放的页面缩略图。当当前页变化时，预览栏 SHALL 自动滚动使高亮缩略图进入可视区域。

#### Scenario: 第 3 页为当前页
- **WHEN** PDF 阅读器当前显示第 3 页
- **THEN** 预览栏中第 3 页的缩略图应有明显的边框高亮（`--color-primary` 色边框），区别于其他缩略图

#### Scenario: 导航后高亮更新
- **WHEN** 用户通过键盘或触控滑动切换到第 5 页
- **THEN** 预览栏中的高亮应从第 3 页缩略图移动到第 5 页缩略图

#### Scenario: 翻页后自动滚动到当前页
- **WHEN** 用户翻页切换到某页，且该页缩略图不在预览栏当前可视区域内
- **THEN** 预览栏 SHALL 平滑滚动，使当前页缩略图进入可视区域（使用 `scrollIntoView({ behavior: 'smooth', block: 'nearest' })`）

#### Scenario: 当前页缩略图已在可视区域时不滚动
- **WHEN** 用户翻页切换到某页，且该页缩略图已在预览栏当前可视区域内
- **THEN** 预览栏不应触发额外滚动
