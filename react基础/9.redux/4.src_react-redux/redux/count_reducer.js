/*
  1. 该文件用于创建一个为 Count 组件服务的 reducer，reducer 本质上就是一个函数
  2. reducer 函数会接收两个参数，分别为：之前的状态(preState) 和 动作对象(action)
*/

const initState = 0;
export default function countReducer(preState = initState, action) {
  // 从 action 对象中获取到 type、data
  const {type, data} = action;
  // 根据 type 决定如何加工数据
  switch(type) {
    case 'increment': 
      return preState + data;
    case 'decrement': 
      return preState - data;
    default:
      return preState;
  }
}