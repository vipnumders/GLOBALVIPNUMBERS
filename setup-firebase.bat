@echo off
echo ========================================
echo    Firebase Hosting Setup Script
echo    Global VIP Numbers
echo ========================================
echo.

echo [1/4] Installing Firebase CLI...
npm install -g firebase-tools
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Firebase CLI
    pause
    exit /b 1
)
echo ✓ Firebase CLI installed successfully
echo.

echo [2/4] Logging in to Firebase...
firebase login
if %errorlevel% neq 0 (
    echo ERROR: Failed to login to Firebase
    pause
    exit /b 1
)
echo ✓ Successfully logged in to Firebase
echo.

echo [3/4] Initializing Firebase project...
echo Please select the following options when prompted:
echo - Select "Hosting"
echo - Choose project "gobal-vip-numbers"
echo - Set public folder to "."
echo - Single-page app: "No"
echo - Overwrite index.html: "No"
echo.
firebase init
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize Firebase
    pause
    exit /b 1
)
echo ✓ Firebase project initialized
echo.

echo [4/4] Deploying to Firebase...
firebase deploy
if %errorlevel% neq 0 (
    echo ERROR: Failed to deploy
    pause
    exit /b 1
)
echo ✓ Successfully deployed to Firebase!
echo.

echo ========================================
echo    🎉 Setup Complete!
echo ========================================
echo.
echo Your website is now live at:
echo https://gobal-vip-numbers.web.app
echo.
echo To update your site in the future, just run:
echo firebase deploy
echo.
echo To preview locally, run:
echo firebase serve
echo.
pause
