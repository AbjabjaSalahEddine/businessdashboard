

var child = require('child_process').exec('npm i && cd client && npm i')
child.stdout.pipe(process.stdout)
child.on('exit', function() {
  process.exit()
})
