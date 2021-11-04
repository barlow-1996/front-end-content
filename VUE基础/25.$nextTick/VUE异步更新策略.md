# VUE 异步更新策略

Vue 更新 DOM 时是异步执行的
侦听到数据变化时，DOM 更新不会立即生效，而是会开启一个队列，同一事件循环中所有数据的变更都会被推入该队列
如果同一个 watcher 被多次触发，只会被推入到队列中一次(避免不必要的计算和 DOM 操作)
然后在下一个事件循环中，Vue 刷新队列并执行已去重的任务

Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver；如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替

## 派发任务

vue 内部有个叫 flushCallbacks 的方法
Vue 中每产生一个状态更新任务，它就会被塞进一个叫 callbacks 的数组（即任务队列）
这个任务队列在被丢进 micro 或 macro 队列之前，会先去检查当前是否有异步更新任务正在执行（即检查 pending 锁）
如果确认 pending 锁是开着的(false)，就把它设置为true(上锁)，然后对当前 callbacks 数组的任务进行派发(丢进 micro或 macro 队列)和执行

设置 pending 锁的意义在于保证状态更新任务的有序进行，避免发生混乱
