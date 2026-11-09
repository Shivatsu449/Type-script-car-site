@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js LTS from https://nodejs.org/en/download first.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing dependencies...
  call npm.cmd ci
  if errorlevel 1 (
    echo Dependency installation failed. Check your internet connection.
    pause
    exit /b 1
  )
)
call npm.cmd run dev
if errorlevel 1 pause
