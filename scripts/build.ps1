$outputPath = "$PSScriptRoot\..\output"

if (Test-Path $outputPath) { 
  Remove-Item $outputPath -Recurse
}

& "$PSScriptRoot\clean.ps1"

pushd "$PSScriptRoot\.."
npm run build-and-deploy