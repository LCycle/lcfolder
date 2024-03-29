@echo off
echo Type 'commands' to see the comands.
:reset
set ing=0
set iA=0
set iC=0
set A=0
goto Back

:add_iA
set /a iA=%iA%+1
echo %iA%
goto Back

:add_iC
set /a iC=%iC%+1
echo %iC%
goto Back

:add_A
set /a A=%A%+1
echo %A%
goto Back

:ingressos
set /a ing=%iA%*10+%iC%*5+%A%*2
echo Voce tem %ing% reais
goto Back

:commands
echo add_iA
echo add_iC
echo add_A
echo ingressos
echo reset

:Back
set /p input=
if "%input%"=="add_iA" goto add_iA
if "%input%"=="add_iC" goto add_iC
if "%input%"=="add_A" goto add_A
if "%input%"=="ingressos" goto ingressos
if "%input%"=="commands" goto commands
if "%input%"=="reset" goto reset
goto Back