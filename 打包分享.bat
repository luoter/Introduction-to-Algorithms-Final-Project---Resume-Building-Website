@echo off
chcp 65001 >nul
echo ========================================
echo       AI 简历生成器 - 打包脚本
echo ========================================
echo.

echo 📦 正在准备打包...
echo.

REM 创建临时打包文件夹
if exist "打包输出\" (
    rmdir /s /q "打包输出\"
)
mkdir "打包输出\"
mkdir "打包输出\AI简历生成器\"

REM 复制必要文件
echo 📋 复制项目文件...

xcopy "src\" "打包输出\AI简历生成器\src\" /e /i /y >nul
copy "index.html" "打包输出\AI简历生成器\" >nul
copy "package.json" "打包输出\AI简历生成器\" >nul
copy "vite.config.js" "打包输出\AI简历生成器\" >nul
copy "README.md" "打包输出\AI简历生成器\" >nul
copy "QUICKSTART.md" "打包输出\AI简历生成器\" >nul
copy "快速启动.bat" "打包输出\AI简历生成器\" >nul
copy "快速构建.bat" "打包输出\AI简历生成器\" >nul

REM 创建说明文件
(
echo AI 简历生成器
echo =============
echo.
echo 🚀 快速开始：
echo 1. 双击运行「快速启动.bat」
echo 2. 等待浏览器自动打开
echo.
echo 📖 更多说明请查看：
echo - QUICKSTART.md（超级快速开始）
echo - README.md（完整文档）
echo.
echo 💡 提示：
echo 需要先安装 Node.js（https://nodejs.org/）
) > "打包输出\AI简历生成器\使用说明.txt"

echo.
echo ✅ 打包完成！
echo.
echo 📁 打包位置：打包输出\AI简历生成器\
echo.
echo 📤 现在你可以将「AI简历生成器」文件夹压缩后分享给其他人了！
echo.
echo 🎯 对方拿到后：
echo 1. 解压文件夹
echo 2. 双击运行「快速启动.bat」
echo.

pause

