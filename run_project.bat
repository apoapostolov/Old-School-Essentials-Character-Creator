@echo off
setlocal EnableDelayedExpansion

rem Change to project directory
cd /d "%~dp0"

rem Check if node_modules exists
if not exist "node_modules\" (
  echo [setup] Installing dependencies...
  call npm install
  if !ERRORLEVEL! neq 0 (
    echo [error] npm install failed
    pause
    exit /b 1
  )
)

rem Direct mode: forward args to npm run dev
if not "%~1"=="" (
  npm run %*
  exit /b %ERRORLEVEL%
)

rem Default: run dev server
echo [run] Starting OSE Character Creator dev server...
echo [run] Opening browser at http://localhost:3000/
timeout /t 2 >nul
start http://localhost:3000/
npm run dev
