@echo OFF

REM reg Query "HKLM\Hardware\Description\System\CentralProcessor\0" | find /i "x86" > NUL && set OsVersion=32BIT || set OsVersion=64BIT
echo Welcome to ScratchDuino-Blockly
REM We first start a browser and then a server to get nodeJS log in same console for easy support
start http://localhost:3000
call nodeJS\node.exe bin\www
pause