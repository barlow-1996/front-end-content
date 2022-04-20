import React, { Component } from 'react';
// import qs from 'querystring'; // 通过该库能够转换 urlencoded 编码,无需下载,react 自带

const DetailData = [
  {id: '1', content: '我爱你中国'},
  {id: '2', content: '我爱你重庆'},
  {id: '3', content: '我爱你妈妈'}
]

class Detail extends Component {
  render() {
    // 接收 params 参数
    // const {id, title} = this.props.match.params; 

    // 接收 search 参数
    // const {search} = this.props.location; 
    // console.log(search); // ?id=1$title=消息1
    // const {id, title} = qs.parse(search.slice(1));

    // 接收 state 参数
    const {id, title} = this.props.location.state;

    const findResult = DetailData.find(data => data.id === id);
    return (
      <ul>
        <li>Id: {id}</li>
        <li>Title: {title}</li>
        <li>Content: {findResult.content}</li>
      </ul>
    );
  }
}

export default Detail;