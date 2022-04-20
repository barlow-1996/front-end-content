/*
  该文件专门为 Count 组件生成 action 对象
*/
export const createIncrementAction = data => ({type: 'increment', data});
export const createDecrementAction = data => ({type: 'decrement', data});
