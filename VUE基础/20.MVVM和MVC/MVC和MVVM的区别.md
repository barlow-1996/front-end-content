# MVC 和 MVVM的区别

MVC 和 MVVM 都是一种设计思想

## MVC

MVC 是后端的分层概念
M： model 模型层(操作数据库)  V: view 视图层（HTML页面）  C：controller 业务逻辑层

Controller 负责将 Model 的数据用 View 显示出来
过程：用户操作 > View(负责接受用户的输入操作) > Controller(业务逻辑处理) > Model(操作数据) > View(将结果反馈给用户)

缺点：

1. 所有业务逻辑都在 Controller 里操作，逻辑复杂且不利于维护
2. 大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验
3. 当 Model 频繁发生变化，需要主动更新到 View；当用户的操作导致 Model 发生变化，同样需要将变化的数据同步到 Model 中，这样工作繁琐且难维护

## MVVM

MVVM 是前端视图层的概念，主要关注于视图层的分层，分为：M：Model V：View VM：ViewModel
M： 保存了每个页面中单独的数据。
V： 是每个页面中HTML的结构。
VM：他是一个调度者，分隔了 V 和 M，是 V 和 M 的中间层。

核心是 ViewModel 提供的双向数据绑定
View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，View 的变动自动反映在ViewModel上，反之亦然，保证了视图和数据的一致性
当用户操作 View(视图)，ViewModel 感知到变化，然后通知 Model 发生相应改变
反之当 Model(数据) 发生改变，ViewModel 也能感知到变化，使 View 作出相应更新

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉
因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理

## MVVM 好处

1. 让开发更加方便
2. 解决了 mvc 中大量的 DOM 操作的问题
