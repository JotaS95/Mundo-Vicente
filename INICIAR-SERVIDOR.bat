@echo off
title Servidor - El Mundo de Vicente
color 0A
echo.
echo  =============================================
echo   El Mundo de Vicente - Servidor Local
echo  =============================================
echo.
echo  Buscando tu direccion IP...
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set IP=%%a
    goto :found
)

:found
set IP=%IP: =%

echo  =============================================
echo.
echo   Abre esto en tu celular:
echo.
echo      http://%IP%:8080
echo.
echo  =============================================
echo.
echo  (El celular debe estar en el mismo WiFi)
echo.
echo  Presiona Ctrl+C para detener el servidor.
echo.

start http://%IP%:8080
python -m http.server 8080

pause
