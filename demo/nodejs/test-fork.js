const { fork } = require('child_process')
const cluster = require('cluster')
const path = require('path')

for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    cluster.fork(path.join(__dirname, 'subprocess.js'))
  }, (i + 1) * 10000)
}
