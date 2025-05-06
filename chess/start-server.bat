@echo off
echo Starting Chess Application Server...
echo.
cd /d "%~dp0"
echo Server will be available at:
echo - Local:   http://localhost:8081/
echo - Network: http://%COMPUTERNAME%:8081/ (or your local IP address)
echo.
echo Press Ctrl+C to stop the server
echo.
npx vite --host --port 8081 --open
