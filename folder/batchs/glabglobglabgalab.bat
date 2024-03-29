@echo off
set error=0
set easteregg=2
set trigger=7
:cp1
cls
echo Este eh um tutorial de como abrir uma porta!
if %error%==0 timeout /t 3 >nul
echo Bom, voce se ve de frente a uma porta e, em cima do tapete na frente dela, uma chave.
if %error%==0 timeout /t 6 >nul
echo O que quer fazer?
if %error%==0 timeout /t 1 >nul
echo.
echo [1] Pegar a chave.
if %error%==0 timeout /t 1 >nul
echo [2] Checar porta.
if %error%==0 timeout /t 1 >nul
echo [3] Olhar em volta.
echo.

if %error%==1 (
set error=e1
goto erMsg
)
:e1

set /p resp=...: 

if "%resp%"=="1" goto A else (
if "%resp%"=="2" goto B else (
if "%resp%"=="3" goto C else (
if "%resp%"=="" (
set error=2
goto cp1
) else (
set error=1
goto cp1
))))

:A
set error=0
set easteregg=2
:cp2
cls
echo Voce se abaixa e pega a chave. Ela parece ser uma
echo chave comum dourada, com a cabeça redonda. Ela
echo parece encaixar na fechadura. 
if %error%==0 timeout /t 10 >nul
echo O que quer fazer?
echo.
echo [1] Usar chave
echo [%easteregg%]
echo [3] Checar porta
echo.

if %error%==1 (
set error=e2
goto erMsg
)
:e2

set /p resp=...: 

if "%resp%"=="1" goto AA else (
if "%resp%"=="3" goto B else (
if "%resp%"=="%easteregg%" (
set error=2
set /a easteregg=%easteregg%+1
if %easteregg%==%trigger% goto ee
goto cp2
) else (
if "%resp%"=="" (
set error=2
goto cp2
) else (
set error=1
goto cp2
))))

:B
set error=0
set easteregg=2
:cp3
cls
echo Voce tenta abrir a porta de madeira, sua macaneta 
echo eh prateada e nao tem janela nem olho magico. Está
echo trancada.
if %error%==0 timeout /t 6 >nul
echo O que quer fazer?
echo.
echo [1] Pegar a chave
echo [%easteregg%]
echo [3] Olhar em volta
echo.

if %error%==1 (
set error=e3
goto erMsg
)
:e3

set /p resp=...: 

if "%resp%"=="1" goto A else (
if "%resp%"=="%easteregg%" (
set error=2
set /a easteregg=%easteregg%+1
if %easteregg%==%trigger% goto ee
goto cp3
) else (
if "%resp%"=="3" goto C else (
if "%resp%"=="" (
set error=2
goto cp3
) else (
set error=1
goto cp3
))))

:C
set error=0
set easteregg=2
:cp4
echo Voce olha em volta e nao ve nada alem de uma estrada atras de voce, a alguns metros de distancia, que se estende para os dois lados ate que nao se possa ver o final dela. Dos seus lados, porem, voce nao ve nada alem de puro nada. Tudo ao seu redor é branco, exceto a porta na sua frente, presa a nada, como se estivesse em pleno ar, e a estrada atras, de onde voce brevemente se recorda de talvez ter vindo. Alias, de onde voce veio mesmo?
if %error%==0 timeout /t 30 >nul
echo.
echo O que quer fazer?
echo.
echo [1] Pegar a chave
echo [%easteregg%]
echo [3] Chechar porta
echo.

if %error%==1 (
set error=e4
goto erMsg
)
:e4

set /p resp=...: 

if "%resp%"=="1" goto A else (
if "%resp%"=="3" goto B else (
if "%resp%"=="%easteregg%" (
set error=2
set /a easteregg=%easteregg%+1
if %easteregg%==%trigger% goto ee
goto cp4
) else (
if "%resp%"=="" (
set error=2
goto cp4
) else (
set error=1
goto cp4
))))

:erMsg
echo Codigo invalido
echo Digite apenas os numeros dados como respostas.
echo.
goto %error%

