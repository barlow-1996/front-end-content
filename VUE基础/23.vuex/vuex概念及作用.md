# vuex概念

Vuex是一个专为vue.js应用程序开发的**状态管理模式**。
它采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 状态管理是什么

其实就是把需要多个组件共享的变量全部存储在一个对象里
然后把这个对象放在顶层的Vue实例中，让其他组件可以使用

## 管理什么状态

在做大型开发项目时，会遇到多个界面间的共享问题，如用户的登陆状态，用户名称、头像、地理位置等
再比如商品的收藏、购物车里的商品等
这些状态信息都可以统一放在一起，对它们进行保存和管理，而且还是响应式的

## vuex 优点

- vuex 中的数据状态能够响应式更新
- 限定了一种可预测的方式改变数据，避免了数据污染

## vuex 与 localStorage 联用

vuex 中的数据保存在内存中，所以当页面刷新时 vuex 中存储的数据会清空
而 localStorage 可以永久保存数据，但是不能像 vuex 那样实现双向绑定，所以 vuex 和 localStorage 结合使用可以达到刷新页面数据不丢失的效果

```javascript
// vuex:
state = {
  catalog_id: '',
},
mutations = {
  setCatalog_id: (state, catalog_id) => {
    localStorage.setItem('catalog_id',catalog_id);
    state.catalog_id = catalog_id;
  }
},
getters = {
  getCatalog_id: (state) => {
    state.catalog_id = localStorage.getItem('catalog_id');
    return state.catalog_id;
  }
}
```

## vuex 实现原理

vuex 是利用 vue 的 mixin 混入机制，在 beforeCreate 钩子前混入 vuexInit 方法
vuexInit 方法实现了 store 注入 vue 组件实例，并注册了 store 的引用属性 $store
