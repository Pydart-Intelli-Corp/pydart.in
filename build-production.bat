@echo off
echo Cleaning previous build artifacts...
if exist ".next" (
    rmdir /s /q .next
    echo Previous build cleaned.
) else (
    echo No previous build found.
)

echo Setting up production environment...
SET NODE_ENV=production
SET EXPORT_MODE=static

echo Starting production build...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo Build completed successfully!
    echo Your static export is ready in the 'out' folder.
) else (
    echo Build failed with error code %ERRORLEVEL%
    echo Please check the error messages above.
)
