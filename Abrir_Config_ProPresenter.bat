@Echo off

chcp 1252 >nul

set fileConfigPP=src\config\env.js

if exist %fileConfigPP% (start /B notepad %fileConfigPP% && goto :EOF)

echo ------------------------------------------------------------
echo ^|    Arquivo de configuração não está presente             ^|
echo ^|    Verifique o caminho "src -> config -> env.js"         ^|
echo ------------------------------------------------------------
echo.

pause

goto :EOF