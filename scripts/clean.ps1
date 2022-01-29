$deployDirName = "mbi-app-heroku-deploy"
$deployPath = "C:\git"
$fullDeployPath = Join-Path -Path $deployPath -ChildPath $deployDirName

if (!(Test-Path $fullDeployPath)) {
  New-Item -Path $deployPath -Name $deployDirName -ItemType "directory"
}

[array]$children1 = Get-ChildItem $fullDeployPath | % { Resolve-Path "$fullDeployPath\$_" }

$deleteExclusions = @(
  ".git", 
  ".gitignore",
  ".env",
  "Procfile",
  "node_modules"
)
$deleteExclusions = $deleteExclusions | % { Join-Path -Path $fullDeployPath -ChildPath $_ }

foreach($child in $children) {
  if ($deleteExclusions.Contains($child)) { 
    #skip 
  }
  else {
    if (Test-Path $child) {
      Remove-Item $child -Recurse
    }
  }
}