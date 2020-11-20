# javascript模块化

早期javascript是没有模块化的, 存在依赖混乱, 和全局空间污染. 为了解决上述弊端, 诞生了js模块化开发.

当前js的模块化规范中, 先后共有5种主流规范

## AMD

特点: 在浏览器中使用, 当需要使用依赖项时, 会预先声明并加载所有的依赖项. 以[`require.js`](https://requirejs.org/docs/start.html)为代表

语法:

```js
// 1. 首先会配置requirejs所管理的所有依赖项
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

// 2. 声明使用依赖的语法
requirejs(['jquery', 'canvas', 'app/sub'], function   ($,canvas,sub) {
    //jQuery, canvas 和 app/sub模块都已经加载完毕, 并且可以使用
});
```

## CMD(Common Module Definition)

以`sea.js`为代表

特点: 当需要依赖项时, 才进行require
语法:

```js

define(function(require){
  var a = require('a');

});

```

## CommonJS

特点: 该规范的核心思想是允许模块通过 `require` 方法来同步加载所要依赖的其他模块, 然后通过 `exports` 或 `module.exports` 来导出需要暴露的接口. 在`nodejs`中广泛使用.

```js
// a.js
module.exports = {
  a: ''
}

// b.js
const {a} = require('./a.js');
```
注意: `CommonJS`中对于模块的导出是浅拷贝

## ES Module

`es6`中广泛使用

```js
export const a = 'a'

import {a} from  './a.js'
```

注意: `CommonJS`中对于模块的导出是值引用

## UMD(Universal Module Definition)

提供一个同时兼容`commonjs, amd, cmd`的加载器, 使得模块化代码在不同的环境中都可以使用.

```js

if(typeof exports === 'object' && typeof module === 'object'){
  // commonjs
  module.exports = factory()
}else if(typeof define === 'function' && define.amd){
  // amd
  define([], factory)
}else{
  // cmd 或 直接挂在在root上
  var a = factory()
  for(var i in a)(typeof exports === 'object' ? exports : root)[i] = a[i];
}

```

## ESModule与CommonJS差异

- CommonJS 模块输出的是一个值的拷贝(输出非基本数据类型时为浅拷贝), ES6 模块输出的是值的引用
- CommonJS 模块是运行时加载, ES6 模块是编译时输出接口
- CommonJS 模块的`require()`是同步加载模块, ES6 模块的import命令是异步加载, 有一个独立的模块依赖的解析阶段



## 参考资料
- [Module 的加载实现 - 阮一峰](https://es6.ruanyifeng.com/#docs/module-loader)