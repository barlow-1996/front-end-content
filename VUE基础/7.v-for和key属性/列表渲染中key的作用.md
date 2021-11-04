# key 的作用

作用：用唯一标识标记每一个节点，可以高效更新虚拟 DOM

使用 key 来给每个节点做一个唯一标识，Diff 算法就可以正确的识别此节点，找到正确的位置区插入新的节点
patch 函数会比较节点的标签名，若标签名一样就会比较 key 值，若 key 值也相同则认为新老节点为同一节点，就不用继续进行 diff 算法了
所以，在做列表渲染时最好加上 key 值

`var colorList = ['red', 'green', 'blue'];`
`<li v-for="color in colorList" :key="color"></li>`

如果列表数据更新了，colorList.splice(1, 1, 'black');
当 diff 算法对新 vnode 与老 vnode 比较时，发现 'red', 'green', 'blue' 对应的 key 值不变，所以不会做改变
只会将 'black' 插入到 真实dom 中

如果没有设置 key，则遍历到 'green' 和 'blue' 时会把它们删除，然后将 'black' 插入后再将它们一个个插入，效率很低
