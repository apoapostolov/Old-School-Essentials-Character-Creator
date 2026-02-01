@echo off
setlocal ENABLEDELAYEDEXPANSION

REM ---- Elevation check (relaunch as Administrator if needed) ----
net session >NUL 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo This script requires elevated privileges. Prompting for elevation...
  powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -WorkingDirectory '%~dp0' -Verb RunAs"
  exit /b
)

set "TASK_NAME=OSE_Roller_Dev_3000"

schtasks /Query /TN "%TASK_NAME%" >NUL 2>&1
if %ERRORLEVEL% EQU 0 (
  echo Updating existing scheduled task "%TASK_NAME%"...
  schtasks /Delete /TN "%TASK_NAME%" /F >NUL 2>&1
)

set "TR_CMD=cmd /c cd /d \"%~dp0\" ^&^& npm run dev -- --port 3000 --host --strictPort"
schtasks /Create /TN "%TASK_NAME%" /TR "%TR_CMD" /SC ONLOGON /RL HIGHEST /F >NUL 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo Failed to create scheduled task. Please run this script in a user session with permission to create tasks.
  exit /b 1
)

schtasks /Run /TN "%TASK_NAME%" >NUL 2>&1
if %ERRORLEVEL% EQU 0 (
  echo Service task "%TASK_NAME%" created and started on port 3000.
) else (
  echo Service task "%TASK_NAME%" created. It will start on next logon.
)
endlocal
exit /b 0
