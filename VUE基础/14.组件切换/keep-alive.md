# keep-alive

keep-alive 用来缓存组件，避免多次加载相应的组件，而不会销毁它们
从页面一跳转到页面二再回退到页面一时，不会重新执行页面一的代码，只会从缓存中加载之前已经缓存的页面一
keep-alive 可以减少加载时间及性能消耗，提高用户体验性

created 和 mounted 只执行一次，之后不会再被执行
beforeDestroy 和 destroyed 不会执行

设置 keep-alive 后会多出来两个生命周期函数 activated 和 deactivated
页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated
当再次进入该页面时，只触发activated，退出时触发deactivated
具体见 组件切换-方式2.html

## keep-alive 实现原理

在 created 生命周期函数时会创建一个 cache 对象，用来作为缓存容器，保存虚拟节点
在需要重新渲染的时候再将虚拟节点从 cache 对象中取出并渲染
在调用 destroyed 钩子函数，在该钩子函数里会遍历 cache 对象，然后将那些被缓存的并且当前没有处于被渲染状态的组件都销毁掉
