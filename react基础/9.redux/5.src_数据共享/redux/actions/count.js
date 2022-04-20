/*
  该文件专门为 Count 组件生成 action 对象
*/
// 同步 action 就是指 action 的值为对象
export const createIncrementAction = data => ({type: 'increment', data});
export const createDecrementAction = data => ({type: 'decrement', data});
// 异步 action 就是指 action 的值为函数。异步 action 中一般都会调用同步 action，异步 action 不是必须要用
export const createIncrementAsyncAction = (data, time = 500) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(createIncrementAction(data));
    }, time)
  }
}