@echo off
chcp 65001 >nul
echo ========================================
echo       AI 简历生成器 - 构建脚本
echo ========================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ 错误：未检测到 Node.js
    pause
    exit /b 1
)

echo 🔨 正在构建项目...
echo.
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ 构建成功！
    echo.
    echo 📁 构建文件已生成到 dist/ 文件夹
    echo.
    echo 你可以：
    echo 1. 使用 npm run preview 本地预览
    echo 2. 将 dist/ 文件夹部署到任何静态托管服务
    echo.
) else (
    echo.
    echo ❌ 构建失败
    echo.
)

pause

