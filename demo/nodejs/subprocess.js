console.log(Date.now(), 'subprocess')

process.on('message', (...args) => {
  console.log(args)
})