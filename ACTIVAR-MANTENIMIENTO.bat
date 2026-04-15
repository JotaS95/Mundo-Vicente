@echo off
title Activar Mantenimiento — El Mundo de Vicente
color 0E
echo.
echo  =============================================
echo   Activando pagina de mantenimiento...
echo  =============================================
echo.

:: Verificar que existe el archivo de mantenimiento
if not exist "mantenimiento.html" (
  echo  ERROR: No se encontro mantenimiento.html
  pause
  exit
)

:: Guardar el index actual como backup
if exist "index.html" (
  ren "index.html" "index-backup.html"
  echo  OK - index.html guardado como backup
)

:: Poner la pagina de mantenimiento como index
ren "mantenimiento.html" "index.html"
echo  OK - Pagina de mantenimiento activada
echo.
echo  =============================================
echo   Listo! La pagina muestra MANTENIMIENTO
echo  =============================================
echo.
pause
