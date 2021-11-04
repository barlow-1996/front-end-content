# vdom(virtual DOM) 虚拟dom

前端主流框架 vue 和 react 中都使用了虚拟DOM（virtual DOM）技术，因为渲染 真实DOM 的开销是很大的，性能代价昂贵
比如：在一次操作中，我需要更新10个 DOM 节点，浏览器收到第一个 DOM 请求后并不知道还有9次更新操作，因此会马上执行流程，最终执行10次
当第一次计算完后，紧接着下一个DOM更新请求，这个节点的坐标值就变了，前一次计算为无用功

虚拟DOM 就是为了解决浏览器性能问题而被设计出来的
若再次操作10次更新 DOM 的动作，虚拟DOM 不会立即操作 DOM，而是将这10次更新的 diff 内容保存到本地一个JS对象中
最终将这个JS对象一次性 attch 到 真实DOM 上，避免大量无谓的计算量

## 什么是 vdom

vdom 其实就是以 js 对象来模拟 dom树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象
最终可以通过一系列操作使这棵树映射到真实的DOM上

## 虚拟 dom 优缺点

优点：

1. 提升性能。通过 diff 算法找出最小差异，然后进行 patch，比操作 dom 性能好很多
2. 无需手动操作 dom，提升开发效率
3. 能够跨平台

缺点：

首次渲染大量 dom，由于多了一层虚拟 dom 的计算，会比 innerHTML 插入慢

总结：如果应用中交互复杂，需要处理大量的UI变化，就可使用虚拟 DOM。如果更新元素并不频繁，那么虚拟 DOM 的性能很可能还不如直接操控 DOM

## 生成虚拟 dom

通过 h 函数用来生成虚拟节点

例如：

```html
<div id="real-container" class="container">
  <p>real DOM</p>
  <div>cannot update</div>
  <ul>
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
  </ul>
</div>
```

生成的 vdom 为：

```javascript
{
  tag: 'div',
  attrs: {id: 'virtual-container',class: 'container'},
  children: [
    {
      tag: 'p',
      attrs: {},
      children: ['virtual DOM']
    },
    {
      tag: 'div',
      attrs: {},
      children: ['before update']
    },
    {
      tag: 'ul',
      attrs: {},
      children: [
        {
          tag: 'li',
          attrs: {class: 'item'},
          children: ['Item1']
        },
        {
          tag: 'li',
          attrs: {class: 'item'},
          children: ['Item2']
        },
      ]
    }
  ]
}
```

除了这三个参数会被保存在对象上外，还保存了 key，这就形成了虚拟 DOM 树

## render 函数

首先通过 h() 函数来创建 虚拟dom
render 函数 用来将真实 dom 渲染到页面上

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

render 函数中的 h 就相当于上面提到的 createElement() 函数

## diff 算法

vdom 因为是纯粹的 JS 对象，所以在更新 vdom 时都会转换成 dom 操作，为了实现高效的 dom 操作，就需要高效的 diff 算法来完成
**注意：diff算法是用来比较老虚拟dom和新虚拟dom的，不是比较真实的dom，而且只比较同一层**

在实际代码中，会对新旧两棵树进行一个深度的遍历，每个节点都会有一个标记
每遍历到一个节点就把该节点和新的树进行对比，如果有差异就记录到一个对象中

diff算法只对 同层的树节点进行比较
同层的 diff 只有 4 种情况：

1. 节点标签改变
如将上面 vdom 的
{
  tag: 'li',
  attrs: {class: 'item'},
  children: ['Item1']
}
改为
{
  tag: 'p',
  attrs: {class: 'item'},
  children: ['Item2']
}
diff 不会再对它们的子节点进行深度比较，会直接将旧节点移除并添加新节点，旧节点包括下面的子节点都将被卸载

2. 节点属性或属性值改变
如上面的节点变为
{
  tag: 'li',
  attrs: {class: 'newItem'},
  children: ['Item1']
}
此时不会触发节点卸载和装载，而会对节点进行更新
首先先创建一个用来存放新属性的对象
对 oldVnode 上的属性值进行遍历，依次比较每个属性值是否与 Vnode 的属性值是否相等，若发现不相等，则将该属性和对应的属性值存入这个对象中
再对 Vnode 上的属性进行遍历，依次判断 oldVnode 是否含有该属性(oldprops.hasOwnProperty)，若不含某个属性，则将该属性和对应的属性值存入这个对象中
最后返回这个对象

3. 节点文本改变
对于文本改变的操作比较简单，直接修改文字内容就行了

4. 移动 / 增加 / 删除节点
为数组或枚举型元素增加上key后，它能够根据key，直接找到具体位置进行操作，效率比较高
**原地复用：若标签相同，key也相同，就认为是相同节点，不继续深度比较**
const vnode1 = h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B')
])
const vnode2 = h('ul', {}, [
  h('li', {key: 'E'}, 'E'), // 在开头新插入一个 li
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B')
])
patch(vnode1, vnode2); // 有了 key 之后，diff就可以根据 key 值来确认相应的元素，原来的元素不用动，在开头加一个li
如果没有key，则需要将原来的A\B两个li移除后再按顺序添加E\A\B

## patch 函数

patch 函数接收两个参数，代表旧虚拟节点(oldVnode)和新虚拟节点(Vnode)
如果旧vnode不是虚拟节点(比如第一次渲染页面时，旧节点不是虚拟节点)，就会把旧节点包装成虚拟节点
判断两节点是否是同一节点(即判断标签名和 key 是否都相等)，是则执行 patchVnode；不是则用 Vnode 直接替换 oldVnode

当确定两个节点是同一节点，就会调用 patchVnode 方法:

- 找到 真实dom，称为 el;
- 判断 Vnode 和 oldVnode 是否指向同一对象，若是就直接 return 什么都不用做;
- 若它们的文本节点不相同，则将 el 的文本节点设置为 Vnode 的文本节点;
- 若 oldVnode 有子节点而 Vnode 没有，则删除 el 子节点；
- 若 oldVnode 没有子节点而 Vnode 有，则将 Vnode 子节点添加到 el;
- 若两者都有子节点，则执行 updateChildren 函数比较子节点

updateChildren 函数：

1. 将 oldVnode 和 Vnode 各定义两个开始索引和结束索引 StartIndex 和 EndIndex，它们各指向 oldVnode 和 Vnode 的起始节点和结束节点
2. 每次做比较时若指向同一节点会移动这些索引，开始索引会向后移动，结束索引会向前移动。当新节点或旧节点开始索引大于结束索引时，循环就结束
3. 将旧开始和新开始、旧结束和新结束、旧开始和新结束、旧结束和新开始四种情况进行比较
如果旧节点开始索引先大于结束索引，则表示新节点中插入了新节点
如果新节点开始索引先大于结束索引，则旧节点中还有剩余节点(也就是旧开始和旧结束中间的节点)则表示它们是要被删除的节点
如果旧开始与新结束命中时，将新开始指向的这个节点移动到旧结束指向的节点的后面
如果旧结束与新开始命中时，将新开始指向的这个节点移动到旧开始指向的节点的前面
4. 如果 4 种比较都不匹配，则会对 key 进行比较
若旧节点的子节点中没有相同的 key，则会创建新的元素
若旧节点的子节点中有相同的 key，则会比较它们的标签。若标签名不同，同样也会创建新的元素；若标签名相同，则会调用 patchVnode 更新这两个节点
