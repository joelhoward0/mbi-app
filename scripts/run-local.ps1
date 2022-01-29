& \git\mbi-app\scripts\build.ps1

pushd '/git/mbi-app-heroku-deploy'

npm i --production

node --async-stack-traces --no-warnings .\server\index.js