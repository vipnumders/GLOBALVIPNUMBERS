@echo off
echo ========================================
echo  Global VIP Numbers - Local Preview
echo ========================================
echo.

REM Detect Firebase CLI
where firebase >nul 2>&1
if %errorlevel%==0 (
  echo 🔧 Firebase CLI detected. Using: firebase serve
  set SERVE_CMD=firebase serve
  set URL=http://localhost:5000
) else (
  echo ℹ️ Firebase CLI not found. Using: npx http-server -p 8000 -c-1
  echo     Tip: npm install -g firebase-tools
  set SERVE_CMD=npx http-server -p 8000 -c-1
  set URL=http://localhost:8000
)

echo.
echo Your site will be available at: %URL%
echo Authentication is required to use the site. Please sign in on the page.
echo.
echo Press any key to start...
pause >nul

echo.
%SERVE_CMD%

echo.
echo Server stopped. Press any key to exit...
pause >nul
