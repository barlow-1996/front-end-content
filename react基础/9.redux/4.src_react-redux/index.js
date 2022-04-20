import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'
import {Provider} from 'react-redux'

ReactDOM.render(
  // 此处用 Provider 包裹 App 组件能让所有后代容器组件都能接收到 store
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
