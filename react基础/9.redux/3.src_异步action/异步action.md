# 异步 action

当延迟的异步任务不想交给组件自身时，可以交给 action 进行异步处理

1. 安装 redux-thunk，并配置在 store 中
`npm i redux-thunk`
import {createStore, applyMiddleware} from 'redux'
import countReducer from './count_reducer'
import thunk from 'redux-thunk'
export default createStore(countReducer, applyMiddleware(thunk));

2. 创建 action 函数不再返回一般对象，而是返回一个函数，该函数中写异步任务

3. 异步任务有结果后，分发一个同步的 action 去真正操作数据
