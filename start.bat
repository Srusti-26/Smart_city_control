@echo off
echo Starting Smart City Control Center...
echo.

cd backend
echo Installing dependencies...
call npm install

echo.
echo Starting backend server...
start "Backend Server" cmd /k "npm start"

echo.
echo Backend server started on http://localhost:3000
echo Opening dashboard...

timeout /t 3 /nobreak > nul
start "" "http://localhost:3000"

echo.
echo Smart City Control Center is now running!
echo - Backend API: http://localhost:3000
echo - Dashboard: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul