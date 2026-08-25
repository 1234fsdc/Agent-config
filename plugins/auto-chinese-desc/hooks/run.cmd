@echo off
rem launcher for auto-chinese-desc: prefer the fixed Python 3.8 path,
rem fall back to PATH python; if neither works, report clearly and
rem exit non-zero so the hook failure is visible in ZCode logs.
set "PYEXE=%LOCALAPPDATA%\Programs\Python\Python38\python.exe"
if not exist "%PYEXE%" set "PYEXE=python"
"%PYEXE%" "%~dp0add-chinese-desc.py"
if errorlevel 1 (
    echo [auto-chinese-desc] FAILED: no usable Python found. Install Python or edit PYEXE in this file. 1>&2
    exit /b 1
)
