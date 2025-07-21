# Security Deployment Script for PyDart Website
# This script helps with secure deployment to production

# Step 1: Check if we have the required tools
Write-Host "🔍 Checking for required tools..." -ForegroundColor Cyan
$tools = @("node", "npm", "firebase")
$missingTools = @()

foreach ($tool in $tools) {
    try {
        $null = Get-Command $tool -ErrorAction Stop
        Write-Host "✅ $tool is installed" -ForegroundColor Green
    } catch {
        $missingTools += $tool
        Write-Host "❌ $tool is not installed" -ForegroundColor Red
    }
}

if ($missingTools.Count -gt 0) {
    Write-Host "Please install the missing tools before proceeding." -ForegroundColor Yellow
    exit 1
}

# Step 2: Security reminder about Razorpay keys
Write-Host "`n🔐 SECURITY REMINDER: Razorpay Keys" -ForegroundColor Yellow
Write-Host "-------------------------------" -ForegroundColor Yellow
Write-Host "1. Have you revoked the previously exposed Razorpay keys?" -ForegroundColor Yellow
Write-Host "2. Have you generated new Razorpay API keys?" -ForegroundColor Yellow
Write-Host "3. Have you updated the .env.production file with the new keys?" -ForegroundColor Yellow
Write-Host "-------------------------------" -ForegroundColor Yellow

$confirmation = Read-Host "Have you completed these security steps? (y/n)"
if ($confirmation -ne "y") {
    Write-Host "Please complete the security steps before deploying." -ForegroundColor Red
    exit 1
}

# Step 3: Build for production
Write-Host "`n🚀 Building for production..." -ForegroundColor Cyan
npm run build:static

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please fix the errors and try again." -ForegroundColor Red
    exit 1
}

# Step 4: Deploy to Firebase
Write-Host "`n🚀 Deploying to Firebase..." -ForegroundColor Cyan
firebase deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed. Please fix the errors and try again." -ForegroundColor Red
    exit 1
}

# Step 5: Security reminder after deployment
Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "`n🔐 FINAL SECURITY REMINDER:" -ForegroundColor Yellow
Write-Host "1. Verify that your new Razorpay keys are working in production" -ForegroundColor Yellow
Write-Host "2. Double check that old keys are revoked in Razorpay dashboard" -ForegroundColor Yellow
Write-Host "3. Consider implementing IP restrictions for your Razorpay account" -ForegroundColor Yellow

Write-Host "`n🎉 Done! Your site is now live with secure configuration." -ForegroundColor Green
