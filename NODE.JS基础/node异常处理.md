# nodeJS 异常处理

## 同步代码的异常处理

- try {} catch 结构
try {
  throw new Error('错误信息');
} catch (e) {
  console.error(e.message);
}

## 异步代码的异常处理

- 监听 process 的 uncaughtException 事件
从 process 上监听 uncaughtException 事件，可以捕获到整个进程包含异步中的错误信息
process.on('uncaughtException', (e)=>{
  console.error('process error is:', e.message);
});

监听该事件会有新的问题，当异常出现时会直接中断执行栈；而到了该事件会导致 V8 引擎不能正常工作，可能导致内存泄漏的问题
所以当捕获到异常时，需要显式的手动关掉进程，并重启 node 进程，这样即保证释放内存，又保证后续服务正常
process.on('uncaughtException', (e)=>{
  console.error('process error is:', e.message);
  process.exit(1);
  restartServer(); // 重启服务
});
