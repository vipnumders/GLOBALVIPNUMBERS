@echo off
echo 🚀 Starting Simple HTTP Server...
echo.
echo This will start a simple server for Firebase Authentication.
echo Your site will be available at: http://localhost:8000
echo.
echo Press any key to start the server...
pause >nul

npx http-server -p 8000 -c-1 --cors

echo.
echo Server stopped. Press any key to exit...
pause >nul
