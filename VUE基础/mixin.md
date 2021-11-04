# mixin

Vue.mixin作用：是一个混入对象，给组件每个生命周期或者函数等都混入一些公共逻辑
mixins是在引入组件之后，则是将组件内部的内容如data等方法、method等属性与父组件相应内容进行合并
相当于在引入后，组件的各种属性方法都被扩充了

## 用法

在外面定义一个 js 文件，比如叫 common.js：

```javascript
export default {
  create() {
    console.log('我是公共的 created 函数');
  }
}
```

然后在需要引入的组件内导入该组件，并通过 mixins 属性引入

```javascript
import commonMixin from './../common.js'
const vm = new Vue({
      el: '#app',
      data: {
      },
      methods: {
      },
      mixins: [commonMixin],
      created() {
        console.log('我是组建内的 created 函数')
      }
    })
```

这时就会看到组件在数据初始化后会打印两个
我是公共的 created 函数
我是组建内的 created 函数
**注意，混入对象的钩子将在组件自身钩子之前调用**

同时，如果组件和混入对象含有同名的属性或方法时，会以恰当的方式进行合并
数据/方法在内部会进行递归合并，并在发生冲突时以组件数据/方法优先

## 缺点

- 多个 mixin 可能会造成命名冲突
- mixin 和组件可能会出现多对多关系，复杂性较高
