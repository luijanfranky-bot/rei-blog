# Rei's Blog - 项目开发总结

## 📅 开发日期
2026-04-20 ~ 2026-04-21

---

## 🎯 项目概述

一个基于 Next.js 15 的现代化个人博客系统，采用优雅的复古像素风格设计，支持在线写作和文章管理。

**在线地址：** https://rei-blog-two.vercel.app

**GitHub 仓库：** https://github.com/luijanfranky-bot/rei-blog

---

## ✅ 已完成的功能

### 1. 前端展示系统

#### 首页设计
- **Hero 区域**：欢迎语 + 绫波丽角色图片 + CTA 按钮
- **3:7 分栏布局**：
  - 左侧（30%）：个人信息卡片
    - 头像（圆形，橙色边框）
    - 个人简介
    - 社交链接（Email、GitHub、Twitter）
    - Sticky 定位，滚动时固定
  - 右侧（70%）：文章列表
    - 竖向堆叠的长条卡片
    - 每篇文章包含：标签、标题、摘要、日期、阅读时间
    - 悬停效果：上移 + 阴影加深
- **导航栏**：
  - Logo + 网站名称（像素字体）
  - 导航菜单：首页、文章、项目、关于
  - 动态登录状态：
    - 未登录：显示"登录"按钮
    - 已登录：显示"管理"和"登出"按钮
  - 橙色边框设计
- **页脚**：三栏布局（关于、快速链接、联系方式）

#### 文章详情页
- 返回首页链接
- 文章标签
- 标题和元信息（日期、阅读时间、作者）
- Markdown 渲染的文章内容
- 底部导航和分享按钮

#### 设计风格
- **配色方案**：米白色背景（#f0eee6）+ 橙色强调色（#d97757）
- **字体**：
  - 标题和导航：Press Start 2P（像素字体）
  - 正文：Ark Pixel（中文像素字体）
- **自定义光标**：绫波丽像素头像
- **背景图案**：微妙的圆点纹理
- **圆角设计**：12px 统一圆角
- **动画效果**：平滑的 cubic-bezier 过渡

---

### 2. 后台管理系统

#### 登录系统
- 简单的密码验证（默认密码：admin123）
- localStorage 存储登录状态
- 登录后自动跳转到文章管理页面

#### 文章管理页面
- 显示所有文章列表
- 每篇文章显示：标题、日期、标签
- 操作按钮：
  - "查看"：在新标签页打开文章详情
  - "编辑"：进入编辑页面
- "返回首页"按钮（替代退出登录）
- "写新文章"按钮

#### Markdown 编辑器
- **左右分栏布局**：
  - 左侧：输入区
    - 标题输入框
    - 标签输入框（逗号分隔）
    - 摘要输入框
    - 封面图 URL 输入框
    - Markdown 内容编辑器
  - 右侧：实时预览
    - 显示渲染后的效果
    - 标签、标题、摘要、正文
- **功能按钮**：
  - "取消"：返回文章管理页面
  - "发布文章"/"保存修改"：保存到数据库

#### 编辑文章功能
- 自动加载现有文章内容
- 支持修改所有字段
- 保存后更新数据库

---

### 3. 技术架构

#### 前端框架
- **Next.js 15.5.15**：React 框架，支持 SSR 和 SSG
- **TypeScript**：类型安全
- **React 19**：最新版本

#### 数据存储
- **Upstash Redis**：云端 Redis 数据库
  - Key-Value 存储
  - 文章数据结构：`post:{slug}` 存储文章对象
  - 文章索引：`posts:slugs` 存储所有文章的 slug
  - 支持在线写作，文章永久保存

#### 部署平台
- **Vercel**：自动部署和托管
  - 连接 GitHub 仓库
  - 每次推送自动部署
  - 全球 CDN 加速
  - 自动 HTTPS

#### 版本控制
- **GitHub**：代码仓库
  - 仓库：luijanfranky-bot/rei-blog
  - 分支：main

---

### 4. 核心功能实现

#### 文章系统
- **创建文章**：
  - 在线填写表单
  - 自动生成 slug（基于标题）
  - 保存到 Redis 数据库
  - 立即在首页显示
- **编辑文章**：
  - 加载现有内容
  - 修改后保存到数据库
  - 更新立即生效
- **查看文章**：
  - 从 Redis 读取文章数据
  - Markdown 转 HTML 渲染
  - 支持代码块、引用、列表等

#### 登录状态管理
- **localStorage 存储**：
  - 键：`isAdmin`
  - 值：`true`（已登录）/ `null`（未登录）
- **导航栏动态显示**：
  - 客户端组件检查登录状态
  - 根据状态显示不同按钮
- **权限保护**：
  - 管理页面检查登录状态
  - 未登录自动跳转到登录页

#### API 路由
- `GET /api/posts`：获取所有文章列表
- `GET /api/posts/[slug]`：获取单篇文章
- `POST /api/posts/create`：创建新文章
- `PUT /api/posts/[slug]`：更新文章

---

## 🔧 技术细节

### Next.js 15 兼容性修复
- **params Promise 处理**：
  - 服务端组件：使用 `await params`
  - 客户端组件：在 `useEffect` 中解包 Promise
  - API 路由：使用 `await params`

### 数据库操作
```typescript
// Redis 数据结构
post:{slug} → Post 对象
posts:slugs → Set<string> (所有文章的 slug)

// 主要操作
- getAllPosts(): 获取所有文章
- getPostBySlug(slug): 获取单篇文章
- createPost(post): 创建新文章
- updatePost(slug, post): 更新文章
- deletePost(slug): 删除文章
```

### 环境变量
```bash
# Upstash Redis（Vercel 自动配置）
UPSTASH_REDIS_REST_URL=xxx
UPSTASH_REDIS_REST_TOKEN=xxx
```

---

## 📦 项目结构

```
rei-blog/
├── app/                          # Next.js App Router
│   ├── admin/                    # 管理后台
│   │   ├── login/               # 登录页面
│   │   └── posts/               # 文章管理
│   │       ├── page.tsx         # 文章列表
│   │       ├── new/             # 写新文章
│   │       └── edit/[slug]/     # 编辑文章
│   ├── api/                      # API 路由
│   │   └── posts/               # 文章 API
│   │       ├── route.ts         # 获取文章列表
│   │       ├── create/          # 创建文章
│   │       └── [slug]/          # 单篇文章操作
│   ├── posts/[slug]/            # 文章详情页
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 首页
├── components/                   # React 组件
│   └── Navigation.tsx           # 导航栏组件
├── lib/                          # 工具函数
│   ├── posts.ts                 # 本地文件操作（已弃用）
│   └── redis-posts.ts           # Redis 数据库操作
├── public/                       # 静态资源
│   ├── logo-avatar.png          # Logo 头像
│   ├── rei-hero.png             # Hero 区图片
│   ├── cursor.png               # 自定义光标
│   └── ark-pixel-*.otf          # 像素字体
├── posts/                        # Markdown 文章（已弃用）
├── .gitignore                    # Git 忽略文件
├── next.config.js               # Next.js 配置
├── package.json                 # 依赖配置
├── tsconfig.json                # TypeScript 配置
└── README.md                    # 项目说明
```

---

## 🚀 部署流程

### 初次部署
1. 创建 GitHub 仓库
2. 推送代码到 GitHub
3. 在 Vercel 导入 GitHub 仓库
4. 配置 Upstash Redis 数据库
5. 自动部署完成

### 后续更新
1. 在本地修改代码
2. 提交到 Git：
   ```bash
   git add .
   git commit -m "更新说明"
   git push
   ```
3. Vercel 自动检测并重新部署（30秒-1分钟）

---

## 📝 使用指南

### 访客使用
1. 访问 https://rei-blog-two.vercel.app
2. 浏览文章列表
3. 点击文章标题查看详情

### 管理员使用
1. 点击导航栏的"登录"按钮
2. 输入密码：`admin123`
3. 登录后点击"管理"进入文章管理页面
4. 点击"写新文章"创建新文章：
   - 填写标题、标签、摘要、内容
   - 点击"发布文章"
5. 点击"编辑"修改现有文章
6. 点击"登出"退出登录状态

---

## 🎨 设计特色

### 视觉风格
- **复古像素风格**：致敬经典游戏美学
- **优雅现代感**：参考 Anthropic 官网设计
- **柔和配色**：米白色 + 橙色，温暖舒适
- **微妙动画**：平滑过渡，不过度炫技

### 用户体验
- **清晰的信息层次**：标签 → 标题 → 摘要 → 元信息
- **直观的操作流程**：登录 → 管理 → 写作 → 发布
- **实时预览**：左边写，右边看，所见即所得
- **响应式设计**：使用 clamp() 实现流畅的字体缩放

---

## 🔄 技术演进

### 第一阶段：静态原型
- 纯 HTML/CSS 设计
- 手工编写样式
- 本地预览

### 第二阶段：Next.js 迁移
- 转换为 Next.js 项目
- 组件化开发
- 本地文件存储文章

### 第三阶段：云端数据库
- 集成 Upstash Redis
- 实现在线写作
- 文章永久保存

---

## 🐛 已解决的问题

### 1. Next.js 15 params Promise 兼容性
**问题**：Next.js 15 将 `params` 改为 Promise 类型  
**解决**：
- 服务端组件：`const { slug } = await params`
- 客户端组件：在 `useEffect` 中解包
- API 路由：`const { slug } = await params`

### 2. Vercel 部署失败
**问题**：TypeScript 类型错误导致构建失败  
**解决**：修复所有 params 类型声明

### 3. 本地文件存储的局限性
**问题**：在线写的文章会在重新部署时丢失  
**解决**：升级到 Upstash Redis 云端数据库

---

## 📊 性能指标

### 构建结果
```
Route (app)                      Size    First Load JS
├ ƒ /                           1.17 kB    112 kB
├ ○ /admin/login                1.04 kB    103 kB
├ ○ /admin/posts                1.14 kB    107 kB
├ ƒ /admin/posts/edit/[slug]    2.13 kB    108 kB
├ ○ /admin/posts/new            1.95 kB    108 kB
├ ƒ /api/posts                   127 B     102 kB
├ ƒ /api/posts/[slug]            127 B     102 kB
├ ƒ /api/posts/create            127 B     102 kB
└ ● /posts/[slug]               1.16 kB    112 kB

○ Static    ● SSG    ƒ Dynamic
```

### 部署速度
- 首次部署：1-2 分钟
- 后续更新：30秒-1分钟

---

## 🔮 未来改进方向

### 功能扩展
- [ ] 文章搜索功能
- [ ] 标签筛选
- [ ] 文章分类
- [ ] 评论系统
- [ ] 阅读统计
- [ ] RSS 订阅
- [ ] 文章草稿功能
- [ ] 图片上传功能
- [ ] Markdown 工具栏
- [ ] 代码高亮主题选择

### 样式优化
- [ ] 恢复卡片悬停特效
- [ ] 优化移动端适配
- [ ] 添加深色模式
- [ ] 优化字体加载
- [ ] 添加页面过渡动画

### 技术优化
- [ ] 添加文章缓存
- [ ] 优化图片加载
- [ ] 添加 SEO 优化
- [ ] 添加 sitemap
- [ ] 添加 robots.txt
- [ ] 性能监控
- [ ] 错误追踪

### 安全增强
- [ ] 更安全的登录系统（JWT）
- [ ] 密码加密存储
- [ ] 防止 XSS 攻击
- [ ] 防止 CSRF 攻击
- [ ] API 请求限流

---

## 📚 技术栈总结

### 核心技术
- **Next.js 15.5.15**：React 框架
- **React 19**：UI 库
- **TypeScript 5.7.2**：类型系统
- **Upstash Redis**：云端数据库

### 工具库
- **gray-matter**：解析 Markdown frontmatter
- **marked**：Markdown 转 HTML

### 开发工具
- **Git**：版本控制
- **GitHub**：代码托管
- **Vercel**：部署平台
- **VS Code**：代码编辑器

---

## 🙏 致谢

感谢以下资源和灵感来源：
- **Anthropic 官网**：设计风格参考
- **Evangelion**：角色形象（绫波丽）
- **Press Start 2P**：像素字体
- **Ark Pixel**：中文像素字体
- **Upstash**：Redis 数据库服务
- **Vercel**：部署平台

---

## 📄 许可证

本项目仅供个人学习和使用。

---

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：
- GitHub Issues
- Email（待添加）
- Twitter（待添加）

---

**最后更新：** 2026-04-21  
**版本：** 1.0.0  
**状态：** ✅ 已上线

---

## 🎉 项目亮点

1. **真正的在线写作**：无需本地环境，任何设备都能登录写文章
2. **优雅的设计**：复古像素风格 + 现代审美
3. **完整的功能**：从展示到管理，一应俱全
4. **技术先进**：Next.js 15 + React 19 + TypeScript
5. **部署简单**：推送代码，自动上线
6. **性能优秀**：静态生成 + 服务端渲染 + CDN 加速

---

**开发者：** Rei  
**协作者：** Claude Sonnet 4.6  
**开发时间：** 2026-04-20 ~ 2026-04-21  
**总耗时：** 约 6 小时

---

## 🌟 结语

这是一个从零开始，一步步构建的现代化博客系统。从最初的静态页面设计，到 Next.js 框架迁移，再到云端数据库集成，每一步都充满了学习和成长。

现在，这个博客已经完全可以投入使用了。你可以在任何地方登录，写下你的想法，分享你的故事。

**祝你写作愉快！** ✨
