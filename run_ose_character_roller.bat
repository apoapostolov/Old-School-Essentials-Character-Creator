@echo off
chcp 65001 >nul

:menu
cls
echo =========================================
echo    OSE Character Roller - Win11 Launcher
echo =========================================
echo  1. 🏃  Run as Dev Server (npm run dev)
echo  2. 👀  Run as Preview (npm run preview)
echo  3. 🛠️  Build Project (npm run build)
echo  4. 📂  Open Project Folder
echo  5. ❌  Exit
echo =========================================
set /p choice="Select an option (1-5): "

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto preview
if "%choice%"=="3" goto build
if "%choice%"=="4" start . & goto menu
if "%choice%"=="5" exit /b

echo Invalid option.
pause
goto menu

:dev
cd /d "%~dp0"
cd /d "c:\Code\projects\aistudio-apps\ose-character-roller"
start "" cmd /c "npm run dev"
timeout /t 3 >nul
start http://localhost:5173/
pause
goto menu

:preview
cd /d "%~dp0"
cd /d "c:\Code\projects\aistudio-apps\ose-character-roller"
start "" cmd /c "npm run preview"
timeout /t 3 >nul
start http://localhost:4173/
pause
goto menu

:build
cd /d "%~dp0"
cd /d "c:\Code\projects\aistudio-apps\ose-character-roller"
call npm run build
pause
goto menu
