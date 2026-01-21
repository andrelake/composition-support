@echo off
TITLE Composition Support Launcher

echo ========================================================
echo Checking system requirements...
echo ========================================================

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installing, restart this script.
    echo.
    pause
    exit /b
)

echo Node.js is installed.
echo.

:: Check if dependencies are installed
if not exist "node_modules\" (
    echo ========================================================
    echo First time setup detected!
    echo Installing required libraries... (This may take a minute)
    echo ========================================================
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Failed to install dependencies.
        echo Please check your internet connection.
        echo.
        pause
        exit /b
    )
)

echo ========================================================
echo Starting Composition Support App...
echo Your browser should open automatically.
echo ========================================================
echo.
echo [NOTE] Do not close this window while using the app.
echo.

call npm run dev

pause
