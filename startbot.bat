@echo off
title Moody Sergal bot
color 1f
cd "C:\Users\Aaron\Documents\Bot"
echo Starting Bot...
goto start
:start
node bot.js
pause
cls
echo Restarting bot...
goto start
