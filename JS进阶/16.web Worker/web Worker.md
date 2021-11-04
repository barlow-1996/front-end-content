# web Worker

Web Worker 是 HTML5 新增的API，能够通过主线程创建其它线程
Web Worker 常用于执行一些费时、大量计算或大量循环的事件

## Web Worker 原理

Web Worker 并不是 JS 的一部分，它是浏览器的特性，通过 JS 来实现的
Web Worker 是在浏览器的一个独立的线程中运行，因此他们的代码需要放在一个单独的js文件中
只要这个 js 文件存在的话，浏览器就会分配出一个线程，去异步下载这个文件。下载完成后就执行这个文件，worker就开始工作了

## 局限性

- worker 中通过 importScripts(url) 函数加载外部脚本
importScripts('script1.js');
**无法跨域加载JS**

- worker 内不能访问 DOM 元素，因此无法操作 DOM

## 创建 Worker

在主线程中调用 Worker 的构造函数创建 Worker 对象
var worker = new Worker(url);

Worker 执行的代码需要保存在单独的文件中，需要在构造函数中传入该文件的相对路径

## 与 Worker 通信

通过 postMessage 进行主线程与子线程间的通信，通过 onMessage 事件接收来自对方的消息(或 addEventListener)
worker.postMessage("hello");
worker.onmessage=function(e){ // 接受子线程数据,e是事件对象,e.data是默认子线程传过来的数据
    console.log(e.data);
}

## 停止 Worker

停止 Worker 的方法有两种：1. 在主线程中调用 worker.terminate(); 2. Worker 本身内部调用 self.close()
**self相当于this，指向该Worker的全局作用域**
