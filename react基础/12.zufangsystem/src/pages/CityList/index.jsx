import React, { Component } from 'react';
import { IndexBar, List, Toast } from 'antd-mobile'
import axios from 'axios';

import './index.scss'
import { getCurrentCity } from '../../utils/index'

import NavHeader from '../../components/NavHeader'

const CITY = ['北京', '上海', '广州', '深圳'];
class index extends Component {
  state = {
    cityIndex: [],
    cityList: {}
  }
  // 获取城市列表
  async getCityList () {
    // 获取所有城市
    const res = await axios.get('http://localhost:8080/area/city?level=1');
    const { cityIndex, cityList } = this.formatCityData(res.data.body);
    // 获取热门城市
    const hotRes = await axios.get('http://localhost:8080/area/hot');
    cityIndex.unshift('hot');
    cityList['hot'] = hotRes.data.body;
    // 获取当前城市
    const curRes = await getCurrentCity();
    cityIndex.unshift('#');
    cityList['#'] = [curRes];
    this.setState({
      cityIndex: cityIndex,
      cityList: cityList
    })
    Toast.clear();
  }
  // 城市列表数据格式化
  formatCityData (list) {
    const cityList = {};
    list.forEach(item => {
      const first = item.short[0];
      if (first in cityList) {
        cityList[first].push(item);
      } else {
        cityList[first] = [item];
      }
    })
    const cityIndex = Object.keys(cityList).sort();
    return {
      cityList,
      cityIndex
    }
  }
  // 切换城市
  changeCity (curCity) {
    // console.log(curCity);
    const { label } = curCity;
    if (CITY.includes(label)) {
      localStorage.setItem('zf-city', JSON.stringify(curCity));
      this.props.history.go(-1);
    } else {
      Toast.show({
        content: '该城市暂无房源信息',
        duration: 1000
      })
    }
  }
  componentDidMount () {
    Toast.show({
      icon: 'loading',
      content: '加载中…',
    })
    this.getCityList();
  }
  componentWillUnmount = () => {
    this.setState = () => {
      return;
    }
  }
  render () {
    return (
      <div>
        <NavHeader>城市选择</NavHeader>
        <div style={{ height: window.innerHeight }}>
          <IndexBar>
            {this.state.cityIndex.map((item, index) => {
              return (
                <IndexBar.Panel
                  index={item.length === 1 ? item === '#' ? item : item.toUpperCase() : '热'}
                  title={item.length === 1 ? item === '#' ? '当前定位' : item.toUpperCase() : '热门城市'}
                  key={index}
                >
                  <List>
                    {this.state.cityList[item].map(city => (
                      <List.Item key={city.value} onClick={() => this.changeCity(city)}>
                        {city.label}
                      </List.Item>
                    ))}
                  </List>
                </IndexBar.Panel>
              )
            })}
          </IndexBar>
        </div>
      </div>
    );
  }
}

export default index;