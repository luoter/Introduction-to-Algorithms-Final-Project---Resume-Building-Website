# 🚀 GitHub Pages 部署指南

完整的部署步骤，一步步教你把项目部署到 GitHub Pages！

---

## 📋 前置准备

在开始之前，请确保你已经：

1. ✅ 有一个 GitHub 账号（没有的话去 https://github.com/ 注册）
2. ✅ 安装了 Git（https://git-scm.com/downloads）
3. ✅ 安装了 Node.js（https://nodejs.org/）

---

## 📝 部署步骤

### 第一步：在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. 填写仓库名称（例如：`ai-resume-generator`）
3. 选择 **Public** 或 **Private**（都可以）
4. **不要**勾选「Initialize this repository」
5. 点击 **Create repository**

### 第二步：配置你的仓库名

打开 `vite.config.js` 文件，找到这一行：

```javascript
base: process.env.NODE_ENV === 'production' ? '/你的仓库名/' : '/'
```

把 `你的仓库名` 改成你刚才创建的仓库名！

例如，如果你的仓库名叫 `ai-resume-generator`，就改成：

```javascript
base: process.env.NODE_ENV === 'production' ? '/ai-resume-generator/' : '/'
```

### 第三步：安装 gh-pages 包

在项目文件夹中打开终端/命令行，运行：

```bash
npm install --save-dev gh-pages
```

### 第四步：提交代码到 GitHub

在终端中依次运行以下命令：

```bash
# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "Initial commit: AI Resume Generator"

# 关联你的 GitHub 仓库（替换为你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

**注意：** 把上面的「你的用户名」和「你的仓库名」替换成你自己的！

### 第五步：构建并部署！

运行以下命令来部署：

```bash
# 构建项目
npm run build

# 部署到 GitHub Pages
npm run deploy
```

### 第六步：启用 GitHub Pages

1. 访问你的 GitHub 仓库页面
2. 点击顶部的 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source** 选择 `Deploy from a branch`
   - **Branch** 选择 `gh-pages` 分支
   - 文件夹选择 `/ (root)`
5. 点击 **Save**

---

## ⏳ 等待部署完成

部署通常需要 1-5 分钟。完成后，你的网站地址是：

```
https://你的用户名.github.io/你的仓库名/
```

例如：
```
https://zhangsan.github.io/ai-resume-generator/
```

---

## 🔄 后续更新

如果你修改了代码，想要重新部署：

```bash
# 1. 提交更改
git add .
git commit -m "更新内容描述"
git push

# 2. 重新部署
npm run build
npm run deploy
```

---

## ❓ 常见问题

### Q: 页面显示 404 怎么办？

A: 检查以下几点：
1. `vite.config.js` 中的 `base` 配置是否正确
2. 仓库名是否和配置的一致
3. 分支是否选对了 `gh-pages`

### Q: 部署后样式不对怎么办？

A: 大概率是 `base` 配置的问题，再检查一下 `vite.config.js` 吧！

### Q: 可以用自定义域名吗？

A: 可以！在 GitHub Pages 设置中添加你的域名，然后在仓库根目录创建 `CNAME` 文件，内容是你的域名。

### Q: 部署失败怎么办？

A: 试试以下方法：
1. 检查 `gh-pages` 是否正确安装
2. 删除 `node_modules` 重新 `npm install`
3. 查看错误信息，搜索解决方法

---

## 📝 快速命令参考

```bash
# 首次部署完整流程
npm install --save-dev gh-pages    # 安装部署工具
git add .                          # 添加文件
git commit -m "Initial commit"    # 提交
git remote add origin 你的仓库地址  # 关联仓库
git push -u origin main           # 推送到 GitHub
npm run build                      # 构建
npm run deploy                     # 部署！

# 后续更新
git add .
git commit -m "描述你的更新"
git push
npm run build
npm run deploy
```

---

## 🎉 恭喜！

部署完成后，你就可以把网址分享给其他人使用了！

有问题？随时查阅此文档或在 GitHub 上搜索解决方案。

---

**祝你使用愉快！** ✨

