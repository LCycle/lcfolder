@echo off
title testin basics

set final=0
:cp1
echo Ola! Como esta sendo ser um  programador?
echo 1) Incrivel!
echo 2) Um pouco chato
echo.
set /p resp=Digite sua resposta: 

if "%resp%"=="1" (
goto boa1
) else if "%resp%"=="2" (
goto ruim1
) else (
cls
echo Ops! Parece que digitou errado, tente novamente.
echo.
goto cp1
)

:boa1
set /a final=%final% + 1
cls
:c2
echo Otimo! E como voce usa seus conhecimentos?
echo 1) Para ajudar as pessoas!
echo 2) sla mano, fazer nada
set /p resp=Digite sua resposta: 
if "%resp%"=="1" (
goto boa2
) else if "%resp%"=="2" (
goto ruim2
) else (
cls
echo Ops! Parece que digitou errado, teste novamente.
echo.
goto c2
)
:ruim1
cls
timeout /t 2 >nul
:c3
echo mas de qualquer forma, como usa seus conhecimentos?
echo 1) ajudo meus amigos
echo 2) ...
set /p resp=sua resposta: 
if "%resp%"=="1" (
goto boa2
) else if "%resp%"=="2" (
goto ruim2
) else (
cls
timeout /t 2 >nul
echo parece que digitou errado
echo.
goto c3
)
:boa2
cls
if %final%==0 (
timeout /t 2 >nul
echo Bom, entao espero que nao desista, e que possa ajuda-los com tudo.
) else (
color 2
title :D
echo Uau! Fico muito feliz em saber disso! Foi muito bom ter voce aqui, ate mais!
)
goto skip
:ruim2
cls
timeout /t 2 >nul
if %final%==1 (
echo Tudo bem, entao espero que siga sempre seus sonhos!
) else (
color 4
title ...
echo .
timeout /t 2 >nul
cls
echo ..
timeout /t 2 >nul
cls
echo ...
timeout /t 2 >nul
exit
)
:skip
pause >nul

