@echo off
echo Testing Smart City Control Center Setup...
echo.

cd backend

echo Checking .env file...
if exist .env (
    echo [OK] .env file exists
) else (
    echo [ERROR] .env file not found!
    echo Please copy .env.example to .env and add your API key
    pause
    exit
)

echo.
echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Node.js is installed
) else (
    echo [ERROR] Node.js not found! Please install Node.js
    pause
    exit
)

echo.
echo Checking dependencies...
if exist node_modules (
    echo [OK] Dependencies installed
) else (
    echo [INFO] Installing dependencies...
    call npm install
)

echo.
echo ========================================
echo Setup verification complete!
echo ========================================
echo.
echo To start the server, run: npm start
echo Then open: http://localhost:3000
echo.
pause
