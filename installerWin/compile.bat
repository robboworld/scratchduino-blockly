@echo OFF

reg Query "HKLM\Hardware\Description\System\CentralProcessor\0" | find /i "x86" > NUL && set OsVersion=32BIT || set OsVersion=64BIT
set FilePath=ololo
IF %OsVersion%==32BIT (
    echo This is a 32bit Windows
    set "FilePath=nodeJS\x86"
) ELSE IF %OsVersion%==64BIT (
    echo This is a 64bit Windows
    set "FilePath=nodeJS\x64"
) ELSE (
    echo Sorry, your system is not supported
)
%FilePath%\npm rebuild