# $nextTick

由于 Vue DOM 更新是异步执行的，即修改数据时，视图不会立即更新

为了确保得到更新后的 DOM，所以设置了 Vue.nextTick() 方法
nextTick 中的回调函数会在 dom 重新渲染挂载完毕后执行

## $nextTick 原理

nextTick 内部有一个函数 nextTickHandler，它能够将 nextTick 里面的回调函数放入微任务或宏任务
nextTickHandler 会先采用微任务实现异步刷新(Promise 如果不行就用 mutationObserver)
如果微任务都不支持，则会采用 setImmediate，如果 setImmediate 也不支持，只能采用 setTimeout。保证其总是在 dom 更新完然后再执行

## 应用场景

- 在 created() 钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
原因是 created() 钩子函数执行时DOM其实并未进行渲染

- 在数据变化后要执行某个操作，而这个操作需要使用数据变化后的 DOM结构，这个操作应该放在Vue.nextTick()的回调函数中
