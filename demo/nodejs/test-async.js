function test() {
  console.log('test')
  return 1

}

const aa = async () => {
  await console.log('aa-before')
  await test()
  console.log('aa-after')
}
aa()
setTimeout(() => {
  console.log('setTimeout')
}, 0)
