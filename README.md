# 📝 AI 简历生成器

一个现代化的 AI 简历生成器，支持在线编辑、实时预览和 Word 文档导出。

## ✨ 功能特点

- 🎨 **现代化 UI** - 香槟白暖色调设计，专业又温馨
- 📱 **响应式布局** - 支持多种设备
- 👁️ **实时预览** - 编辑内容时立即看到效果
- 📄 **Word 导出** - 一键导出专业格式简历
- 💾 **本地存储** - 自动保存你的数据
- 🤖 **AI 辅助** - 智能优化你的简历内容

## 🚀 快速开始

### 方式一：本地运行（推荐）

#### 前置要求

确保你的电脑已安装：
- [Node.js](https://nodejs.org/) (建议 v18 或更高版本)
- npm 或 yarn

#### 步骤

1. **获取项目文件**
   - 如果有压缩包，直接解压
   - 或者从源代码仓库下载

2. **安装依赖**

```bash
npm install
```

或者使用 yarn：
```bash
yarn install
```

3. **启动开发服务器**

```bash
npm run dev
```

4. **打开浏览器**

访问终端显示的地址（通常是 `http://localhost:3000`）

---

### 方式二：使用构建后的静态文件

1. **构建项目**

```bash
npm run build
```

2. **启动预览服务器**

```bash
npm run preview
```

3. **或者直接部署 `dist` 文件夹**

`dist` 文件夹包含了完整的静态文件，可以直接部署到任何支持静态文件托管的服务。

---

### 方式三：一键部署到云服务

#### 部署到 Vercel (推荐)

1. 注册 [Vercel 账号](https://vercel.com/)
2. 将项目推送到 GitHub/GitLab/Bitbucket
3. 在 Vercel 中导入项目
4. 点击部署，完成！

#### 部署到 Netlify

1. 注册 [Netlify 账号](https://www.netlify.com/)
2. 将项目推送到 GitHub
3. 在 Netlify 中导入项目
4. 配置构建命令：`npm run build`
5. 配置发布目录：`dist`
6. 点击部署！

#### 部署到 GitHub Pages

1. 推送代码到 GitHub 仓库
2. 安装 `gh-pages` 包：

```bash
npm install --save-dev gh-pages
```

3. 在 `package.json` 中添加：

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

4. 构建并部署：

```bash
npm run build
npm run deploy
```

---

## 📖 使用指南

### 1. 基本信息

填写你的姓名、联系方式、求职意向等基础信息。

### 2. 教育经历

添加你的教育背景，支持多段教育经历。

### 3. 工作/实习经历

记录你的工作或实习经验，详细描述你的职责和成就。

### 4. 项目经历

展示你参与的项目，突出你的贡献和成果。

### 5. 技能特长

列出你的专业技能，使用逗号、换行或顿号分隔。

### 6. 自我评价

简要介绍你的个人优势和职业态度。

### 7. AI 优化

每个模块都有「AI 优化」按钮，点击后会智能优化你的内容描述。

### 8. 导出简历

点击右上角的「📄 导出 Word」按钮，即可下载专业格式的简历文档。

---

## 🛠️ 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **文档导出**: docx.js
- **路由**: React Router
- **样式**: 原生 CSS (使用 CSS 变量)

---

## 📁 项目结构

```
ai-resume-generator/
├── src/
│   ├── components/        # 组件
│   │   ├── common/       # 通用组件
│   │   ├── ResumeForm/   # 表单组件
│   │   └── ResumePreview/# 预览组件
│   ├── hooks/           # 自定义 Hooks
│   ├── pages/           # 页面组件
│   ├── services/        # 服务
│   ├── App.jsx          # 应用入口
│   └── main.jsx         # 渲染入口
├── dist/                # 构建输出 (npm run build 后生成)
├── index.html           # HTML 模板
├── package.json         # 项目配置
└── vite.config.js       # Vite 配置
```

---

## 💡 常见问题

### Q: 我的数据会上传到服务器吗？
A: 不会。所有数据都存储在浏览器的本地存储中，不会上传到任何服务器。

### Q: AI 功能需要额外配置吗？
A: 是的。如果你需要使用 AI 功能，需要配置 API 密钥。请查看 `src/services/aiService.js` 文件进行配置。

### Q: 支持中文输入吗？
A: 完全支持！界面设计专门为中文用户优化。

### Q: 导出的文档格式可以自定义吗？
A: 可以！修改 `src/services/docxService.js` 文件来自定义输出格式。

---

## 📄 许可证

本项目仅供学习和个人使用。

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📮 联系

如有问题，欢迎反馈！

---

**享受使用 AI 简历生成器，祝你求职顺利！** 🎉

