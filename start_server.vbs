Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c taskkill /IM node.exe /F & timeout /t 5 /NOBREAK && node C:\pp-remote\server.js", 0, False
