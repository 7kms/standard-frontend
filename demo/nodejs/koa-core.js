function compose(middleware = []) {
  let startIndex = 0;
  return function dispach(ctx) {
    if (startIndex > middleware.length - 1) {
      return
    }
    return Promise.resolve(middleware[startIndex++](ctx, dispach.bind(null, ctx)))
  }
}

function compose2(middleware = []) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!')
  }
  for (const fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!')
    }
  }
  return function (context, next) {
    let index = -1;
    function dispach(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[index]
      if (index === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispach.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispach(0)
  }
}

compose([
  async (ctx, next) => {
    console.log('before', 1)
    await next()
    console.log('after', 1)
  },
  async (ctx, next) => {
    console.log('before', 2)
    await next()
    console.log('after', 2)
  },
  async (ctx, next) => {
    console.log('before', 3)
    await next()
    console.log('after', 3)
  }
])({})