// 初始化人的列表
const initState = [{id: 0, name: 'byl', age: 18}];

export default function personReducer(preState = initState, action) {
  const {type, data} = action;
  switch(type) {
    case 'addPerson': // 添加一个人
      // preState.unshift(data); // 不能这样写，这样会导致 preState 被改写了，personReducer 就不是纯函数了，所以无法实现效果
      return [data, ...preState];
    default: 
      return preState;
  }
}