var child = require('child_process').exec('cd .. && npm start')
child.stdout.pipe(process.stdout)
child.on('exit', function() {
  process.exit()
})



