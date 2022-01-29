const deployDir = '/git/mbi-app-heroku-deploy'

const fs = require('fs-extra')

fs.copySync('output', `${deployDir}`)
fs.copySync('client/index.html', `${deployDir}/client/index.html`)
fs.copySync('client/app.css', `${deployDir}/client/app.css`)
fs.copySync('client/format.pdf', `${deployDir}/client/format.pdf`)
fs.copySync('package.json', `${deployDir}/package.json`)

console.log('Done')