
// 引入 combineReducers 用来合并所有的 reducer
import {createStore, applyMiddleware, combineReducers} from 'redux'
// 引入为 Count 组件服务的 reducer
import countReducer from './reducers/count'
// 引入为 Person 组件服务的 reducer
import personReducer from './reducers/person';
// 引入 redux-thunk，用于支持异步 action
import thunk from 'redux-thunk'

// 合并所有的 reducer，combineReducers 传入的对象就是 redux 维护的状态对象
const allReducers = combineReducers({
  sum: countReducer,
  persons: personReducer
})
export default createStore(allReducers, applyMiddleware(thunk));