# vue 3.0 新特性

## 节点做标记

静态节点：```<span>value</span>```
动态节点：```<span>{{value}}</span>```

vue3.0 会自动识别某个节点是否是动态的，若是动态的会自动生成标记(不同动态节点对应不同标记，如内容文本动态、id动态等)
在每次进行 diff 算法时会自动跳过静态节点，大大提升效率

## 响应式 Proxy

1. vue2.0 响应式原理: defineProperty
响应化过程需要遍历data，props等，消耗较大
不支持Set/Map、class、数组等类型
新加或删除属性无法监听
数组响应化需要额外实现

2. vue3.0 响应式原理: Proxy

## template 无需包裹根节点

vue3.0 中 template 中无需用一个 div 包裹，可以多个标签（节点）并列

```html
<!-- vue2.0 -->
<template>
    <div>
        <header>...</header>
        <footer>...</footer>
    </div>
</template>

<!-- vue3.0 -->
<template>
    <header>...</header>
    <footer>...</footer>
</template>
```

## Tree Shaking

使用了 Tree Shaking 实现按需加载，使打包的体积更小
