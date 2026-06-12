@echo off
chcp 65001 >nul
echo ========================================
echo       AI 简历生成器 - 快速启动
echo ========================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ 错误：未检测到 Node.js
    echo.
    echo 请先安装 Node.js:
    echo 1. 访问 https://nodejs.org/
    echo 2. 下载并安装 LTS 版本
    echo 3. 重新运行此脚本
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js 已安装
node -v
echo.

REM 检查是否已安装依赖
if not exist "node_modules\" (
    echo 📦 正在安装依赖...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
    echo.
)

echo 🚀 正在启动开发服务器...
echo.
echo 稍后请在浏览器中访问显示的地址（通常是 http://localhost:3000）
echo.
echo 按 Ctrl+C 可以停止服务器
echo.
call npm run dev
pause

