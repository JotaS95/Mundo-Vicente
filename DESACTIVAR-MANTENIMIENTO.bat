@echo off
title Desactivar Mantenimiento — El Mundo de Vicente
color 0A
echo.
echo  =============================================
echo   Desactivando pagina de mantenimiento...
echo  =============================================
echo.

:: Verificar que existe el backup
if not exist "index-backup.html" (
  echo  ERROR: No se encontro el backup del sitio.
  echo  Asegurate de haber activado el mantenimiento primero.
  pause
  exit
)

:: Guardar la pagina de mantenimiento de vuelta
if exist "index.html" (
  ren "index.html" "mantenimiento.html"
  echo  OK - Pagina de mantenimiento guardada
)

:: Restaurar el sitio original
ren "index-backup.html" "index.html"
echo  OK - Sitio original restaurado
echo.
echo  =============================================
echo   Listo! La pagina vuelve al sitio NORMAL
echo  =============================================
echo.
pause
