// 初始化人的列表
const initState = [{id: 0, name: 'byl', age: 18}];

export default function personReducer(preState = initState, action) {
  const {type, data} = action;
  switch(type) {
    case 'addPerson': // 添加一个人
      return [data, ...preState];
    default: 
      return preState;
  }
}