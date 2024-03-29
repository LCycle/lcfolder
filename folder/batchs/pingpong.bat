@echo off
:loop
color 2
echo Ping!
timeout /t 1 >nul
color 4
echo Pong!
timeout /t 1 >nul
goto loop