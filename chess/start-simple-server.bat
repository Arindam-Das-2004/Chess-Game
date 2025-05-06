@echo off
echo Starting Simple Chess Server...
echo.
cd /d "%~dp0"
echo Server will be available at:
echo - Local:   http://localhost:5000/
echo - Network: http://%COMPUTERNAME%:5000/ (or your local IP address)
echo.
echo Press Ctrl+C to stop the server
echo.
node simple-server.js
