# 个人博客设计 - CSS 框架

优雅复古风格的博客设计系统，结合 Anthropic 现代简洁风格与轻度像素风点缀。

## 📁 文件结构

```
个人博客设计/
├── variables.css      # CSS 变量系统（颜色、尺寸、间距等）
├── base.css          # 基础样式和重置
├── typography.css    # 字体系统（像素字体标题 + 现代正文）
├── layout.css        # 布局系统（网格、Flexbox、间距）
├── components.css    # UI 组件（按钮、卡片、导航等）
├── example.html      # 示例页面
└── README.md         # 本文档
```

## 🎨 设计特点

### 1. 配色方案
- **主色调**：米色/象牙色系（#faf8f5, #f5f2ed）
- **文字色**：石板灰系（#2d2d2d, #5a5a5a）
- **强调色**：陶土色（#d97757）
- 柔和、温暖、优雅的视觉感受

### 2. 字体系统
- **标题**：Press Start 2P 像素字体（复古游戏风）
- **正文**：Anthropic Sans 现代无衬线字体（易读性）
- **代码**：等宽字体
- **引用**：Anthropic Serif 衬线字体

### 3. 像素风元素（轻度点缀）
- 小圆角（2-6px）保持锐利感
- 像素风阴影（硬边缘）
- 像素边框装饰
- 点状分隔线

### 4. 响应式设计
- 使用 `clamp()` 实现流畅缩放
- 12 列网格系统
- 移动端友好

## 🚀 快速开始

### 1. 引入 CSS 文件

在 HTML 的 `<head>` 中按顺序引入：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的博客</title>
  
  <!-- 按顺序引入 CSS -->
  <link rel="stylesheet" href="variables.css">
  <link rel="stylesheet" href="base.css">
  <link rel="stylesheet" href="typography.css">
  <link rel="stylesheet" href="layout.css">
  <link rel="stylesheet" href="components.css">
</head>
<body>
  <!-- 你的内容 -->
</body>
</html>
```

### 2. 基础页面结构

```html
<body>
  <!-- 导航栏 -->
  <nav class="nav">
    <div class="nav__container container">
      <a href="/" class="nav__logo">我的博客</a>
      <ul class="nav__menu">
        <li><a href="#" class="nav__link nav__link--active">首页</a></li>
        <li><a href="#" class="nav__link">文章</a></li>
        <li><a href="#" class="nav__link">关于</a></li>
      </ul>
    </div>
  </nav>

  <!-- 主内容 -->
  <main>
    <section class="section">
      <div class="container">
        <h1>欢迎来到我的博客</h1>
        <p>这是一个优雅的复古风格博客。</p>
      </div>
    </section>
  </main>

  <!-- 页脚 -->
  <footer class="footer">
    <div class="container">
      <div class="footer__bottom">
        <p>&copy; 2026 我的博客. 保留所有权利。</p>
      </div>
    </div>
  </footer>
</body>
```

## 📦 组件使用示例

### 按钮

```html
<!-- 普通按钮 -->
<button class="btn btn--primary">主要按钮</button>
<button class="btn btn--secondary">次要按钮</button>

<!-- 像素风按钮 -->
<button class="btn btn--pixel btn--primary">像素按钮</button>

<!-- 不同尺寸 -->
<button class="btn btn--primary btn--small">小按钮</button>
<button class="btn btn--primary btn--large">大按钮</button>
```

### 卡片

```html
<!-- 普通卡片 -->
<div class="card">
  <h3 class="card__title">卡片标题</h3>
  <p class="card__content">卡片内容...</p>
</div>

<!-- 像素风卡片 -->
<div class="card card--pixel">
  <h3 class="card__title">像素卡片</h3>
  <p class="card__content">带有像素风格的卡片</p>
</div>
```

### 徽章

```html
<span class="badge">标签</span>
<span class="badge badge--accent">强调标签</span>
<span class="badge badge--pixel">像素标签</span>
```

### 网格布局

```html
<!-- 3 列网格 -->
<div class="grid grid--3 gap--6">
  <div class="card">内容 1</div>
  <div class="card">内容 2</div>
  <div class="card">内容 3</div>
</div>

<!-- 12 列网格（自定义跨度）-->
<div class="grid grid--12 gap--6">
  <div class="col-span--8">主内容（8列）</div>
  <div class="col-span--4">侧边栏（4列）</div>
</div>
```

### 文章布局

```html
<article class="article">
  <header class="article__header">
    <h1 class="article__title">文章标题</h1>
    <div class="article__meta">
      <span>2026年4月20日</span>
      <span>5 分钟阅读</span>
    </div>
  </header>
  
  <div class="article__content">
    <p>文章内容...</p>
  </div>
</article>
```

## 🎯 CSS 变量使用

你可以在自己的 CSS 中使用这些变量：

```css
.my-custom-element {
  /* 颜色 */
  color: var(--color-text);
  background-color: var(--color-background);
  
  /* 间距 */
  padding: var(--space--4);
  margin-bottom: var(--space--6);
  
  /* 圆角 */
  border-radius: var(--radius--main);
  
  /* 字体 */
  font-size: var(--font-size--paragraph-m);
  font-family: var(--font--sans);
  
  /* 阴影 */
  box-shadow: var(--shadow--soft-md);
  
  /* 过渡 */
  transition: all var(--transition--normal);
}
```

## 🎨 自定义主题

如果想调整配色，只需修改 `variables.css` 中的颜色变量：

```css
:root {
  /* 修改主色调 */
  --swatch--ivory-light: #你的颜色;
  
  /* 修改强调色 */
  --swatch--clay: #你的颜色;
  
  /* 修改文字色 */
  --swatch--slate-dark: #你的颜色;
}
```

## 📱 响应式断点

- **移动端**：< 768px
- **桌面端**：≥ 769px

使用示例：

```css
@media (max-width: 768px) {
  /* 移动端样式 */
}
```

## 💡 最佳实践

1. **保持简洁**：不要过度使用像素风元素，保持 10% 点缀即可
2. **语义化 HTML**：使用正确的 HTML 标签（`<article>`, `<section>`, `<nav>` 等）
3. **可访问性**：确保颜色对比度足够，添加适当的 ARIA 标签
4. **性能优化**：像素字体文件较大，考虑只在标题使用

## 🔧 后续调整

如需调整风格，可以修改：

- **增加像素风**：调大 `--border-width--pixel`，使用更多 `.btn--pixel` 和 `.card--pixel`
- **减少像素风**：减少像素字体使用，增大圆角值
- **改变配色**：修改 `variables.css` 中的 `--swatch--*` 变量
- **调整间距**：修改 `--space--*` 变量

## 📄 许可

此设计系统供个人使用。

---

**设计理念**：优雅的复古 = 90% 现代简洁 + 10% 像素风点缀
