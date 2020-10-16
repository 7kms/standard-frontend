# 加载性能

加载速度直接影响到 web 首屏的显示时间, 对于用户体验至关重要.

## 减小 bundle size

bundle size 直接影响到了 js 加载时间和执行时间, 尽量减小 bundle size 十分重要.

1. 利用 webpack 或 rollup 的 tree shaking

   - 在 js 的写法上需要注意标准 es6 module 写法

2. 通过`webpack bundle size`分析工具查看各个资源分布的大小, 进而正对性的做出优化

3. 资源懒加载

## [优化关键渲染路径](https://developers.google.com/web/fundamentals/performance/critical-rendering-path?hl=zh-cn)

### 步骤

1. 处理 HTML 标记并构建 DOM 树
2. 处理 CSS 标记并构建 CSSOM 树
3. 将 DOM 和 CSSOM 合并成一个渲染树
4. 根据渲染树来布局, 以计算每个节点的几何信息
5. 将各个节点绘制到屏幕上

优化关键渲染路径就是指最大限度缩短执行上述第 1 步至第 5 步耗费的总时间.

- 关键资源： 可能阻止网页首次渲染的资源。
- 关键路径长度： 获取所有关键资源所需的往返次数或总时间。
- 关键字节： 实现网页首次渲染所需的总字节数，它是所有关键资源传送文件大小的总和。

1. 对关键路径进行分析和特性描述: 资源数、字节数、长度
2. 最大限度减少关键资源的数量: 删除它们，延迟它们的下载, 将它们标记为异步等
3. 优化关键字节数以缩短下载时间（往返次数）
4. 优化其余关键资源的加载顺序, 需要尽早下载所有关键资产,以缩短关键路径长度

### 阻塞问题

阻塞分为 2 个层面, 包括解析阻塞和渲染阻塞.

- 解析阻塞: 会影响`DOMContentLoaded`的触发时机
- 渲染阻塞: 仅指浏览器是否要暂停网页的首次渲染, 直至该资源准备就绪. `render = DOM + CSSOM`, 任何阻塞`DOM`解析的情况同时也会阻塞渲染, 这是导致白屏的原因.

1. render = `DOM` + `CSSOM`.
2. 正常情况下只有`DOM` 和`CSSOM`同时解析完成之后, 才会渲染页面. 如果`CSS`加载失败, 也会渲染.
3. 正常情况下`css`的加载只会阻塞渲染(css 未加载完成, 就会一直白屏, 不会 render), 不会阻塞 dom 解析(也就是说`DOMContentLoaded`事件可能在 css 加载完成之前触发).
4. 当存在 js 的时候(js 在 css 之后, 且不为 async), `css`会阻塞 dom 解析和 `js` 执行(css 和 js 的下载还是并行的), dom 会等待 js 执行完成之后继续解析.

5. css 阻塞
   - 如果只有 css 而没有 js(或有 async 类型的外部脚本), css 是不会阻塞 dom 解析的. `DOMContentLoaded`事件会很快触发
   - 如果 css 后面还有 js(内联脚本或非 async 脚本), 都会等待 css 下载完成(css 和 js 并行加载), 并解析成`CSSOM`之后, 才会继续执行 js, 最后触发`DOMContentLoaded`
6. js 阻塞
   - 带有 defer 或 async 的 js 不会阻塞 dom 解析.`DOMContentLoaded`事件会很快触发
   - 其余情况需要等待 js 下载并执行完成之后才会触发`DOMContentLoaded`

## js 并行加载

- JavaScript 可以查询和修改 DOM 与 CSSOM
- JavaScript 执行会阻止 CSSOM
- 除非将 JavaScript 显式声明为异步，否则它会阻止构建 DOM

`阻塞渲染`仅是指浏览器是否需要暂停网页的首次渲染，直至该资源准备就绪

在关键渲染路径中, js 是阻塞 dom 解析的. css 不阻塞 dom 解析, 但是阻塞渲染.

- CSS 是`阻塞渲染`的资源, 需要将它尽早、尽快地下载到客户端, 以便缩短首次渲染的时间.

## 资源预加载

## 数据预加载

## 图片优化
