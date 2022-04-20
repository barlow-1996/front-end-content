import React, { Component } from 'react';
import { Swiper, Grid, Search } from 'antd-mobile';
import axios from 'axios';
import './index.scss'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
import {getCurrentCity} from '../../utils/index'
// 获取地理位置信息
// function success(pos) {
//   var crd = pos.coords;
//   console.log('Your current position is:');
//   console.log('Latitude : ' + crd.latitude);
//   console.log('Longitude: ' + crd.longitude);
//   console.log('More or less ' + crd.accuracy + ' meters.');
// };
// function error(err) {
//   console.warn('ERROR(' + err.code + '): ' + err.message);
// };
// navigator.geolocation.getCurrentPosition(success, error);

class index extends Component {
  state = {
    // 轮播图数据
    swipers: [],
    isGetSwipers: false,
    // 导航菜单数据
    navList: [
      {
        id: 1,
        img: nav1,
        title: '整租',
        path: '/home/list'
      },
      {
        id: 2,
        img: nav2,
        title: '合租',
        path: '/home/list'
      },
      {
        id: 3,
        img: nav3,
        title: '地图找房',
        path: '/map'
      },
      {
        id: 4,
        img: nav4,
        title: '去出租',
        path: '/rent'
      },
    ],
    // 租房小组数据
    groups: [],
    // 资讯数据
    news: [],
    // 当前城市名称
    curCity: ''
  }
  // 获取轮播图数据
  async getSwipers () {
    const res = await axios.get('http://localhost:8080/home/swiper');
    this.setState({
      swipers: res.data.body,
      isGetSwipers: true
    });
  }

  // 获取租房小组数据
  async getGroups () {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    });
    this.setState({ groups: res.data.body });
  }

  // 获取咨询数据
  async getNews () {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    });
    this.setState({ news: res.data.body });
  }

  async componentDidMount () {
    this.getSwipers();
    this.getGroups();
    this.getNews();
    // 通过 IP 定位获取当前城市名称
    const curCity = await getCurrentCity();
    this.setState({
      curCity: curCity.label
    })
  }

  render () {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="swiper">
          {
            this.state.isGetSwipers ?
              <Swiper autoplay>
                {
                  this.state.swipers.map(swiper => (
                    <Swiper.Item key={swiper.id}>
                      <img className='content' src={`http://localhost:8080${swiper.imgSrc}`} alt={swiper.alt}></img>
                    </Swiper.Item>
                  ))
                }
              </Swiper>
              : ''
          }
          {/* 搜索框 */}
          <Grid className="search" columns={6}>
            <Grid.Item className="location" onClick={() => this.props.history.push('/citylist')}>
              <span className="name">{this.state.curCity}</span>
              <i className="iconfont icon-arrow" />
            </Grid.Item>
            <Grid.Item className="form" span={4} onClick={() => this.props.history.push('/search')}>
              <Search className="text" placeholder='请输入小区或地址' />
            </Grid.Item>
            <Grid.Item className="map" onClick={() => this.props.history.push('/map')}>
              <i className="iconfont icon-map" />
            </Grid.Item>
          </Grid>
        </div>

        {/* 导航菜单 */}
        <Grid className="nav" columns={4} gap={8}>
          {
            this.state.navList.map(nav => (
              <Grid.Item key={nav.id} onClick={() => this.props.history.push(nav.path)}>
                <img src={nav.img} alt="" />
                <h2>{nav.title}</h2>
              </Grid.Item>
            ))
          }
        </Grid>
        {/* 租房小组 */}
        <div className="group">
          <h3 className="title">
            租房小组
            <span className="more">更多</span>
          </h3>
          <Grid columns={2} gap={10}>
            {
              this.state.groups.map(group => (
                <Grid.Item key={group.id} className="grid-item">
                  <div className="desc">
                    <p className="title">{group.title}</p>
                    <span className="info">{group.desc}</span>
                  </div>
                  <img src={`http://localhost:8080${group.imgSrc}`} alt="" />
                </Grid.Item>
              ))
            }
          </Grid>
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="title">最新资讯</h3>
          <Grid columns={1} gap={10}>
            {
              this.state.news.map(item => (
                <Grid.Item key={item.id} className="news-item">
                  <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                  <div className="news-info">
                    <h3 className="title">{item.title}</h3>
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                  </div>
                </Grid.Item>
              ))
            }
          </Grid>
        </div>
      </div>
    );
  }
}

export default index;