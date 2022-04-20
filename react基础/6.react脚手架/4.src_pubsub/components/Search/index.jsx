import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios';
class Search extends Component {

  search = () => {
    // 连续解构赋值
    const {keyWord: {value}} = this;
    // 通知 List 更新状态
    PubSub.publish('changeState', {isFirst: false, isLoading: true});
    // 发送网络请求
    axios.get(`https://api.github.com/search/users?q=${value}`).then(
      response => {
        // 请求成功后通知 List 更新状态
        PubSub.publish('changeState', {isLoading: false, users: response.data.items});
      },
      error => {
        // 请求失败后通知 List 更新状态
        PubSub.publish('changeState', {isLoading: false, err: error.message});
      }
    )
  }

  render() {
    return (
      <div>
        <section>
          <h3>搜索 github 用户</h3>
          <div>
            <input type="text" ref={c => this.keyWord = c} placeholder="请输入关键字"/>&nbsp;
            <button onClick={this.search}>搜索</button>
          </div>
        </section>
      </div>
    );
  }
}

export default Search;