import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Toast} from 'antd-mobile'
import axios from 'axios'
import styles from './index.module.css'

import NavHeader from '../../components/NavHeader'

class index extends Component {
  state = {
    // 小区房源列表
    housesList: [],
    isShowList: false
  }
  componentDidMount () {
    this.initMap();
  }
  initMap () {
    // 获取当前定位城市
    const { label, value } = JSON.parse(localStorage.getItem('zf-city'));
    // 创建地图实例
    const map = new window.BMapGL.Map("container");
    this.map = map; // 能够在其他方法中获取 map
    // 创建地址解析器实例
    const myGeo = new window.BMapGL.Geocoder();
    myGeo.getPoint(label, async point => {
      if (point) {
        map.centerAndZoom(point, 11);
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        const scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        const zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl);
        this.renderOverlays(value);
      } else {
        alert('您选择的地址没有解析到结果！');
      }
    }, label)
    // 给地图绑定移动事件
    map.addEventListener('movestart', () => {
      this.state.isShowList &&
      this.setState({
        isShowList: false
      })
    })
  }
  async renderOverlays (id) {
    try {
      Toast.show({ // 开启加载提醒
        icon: 'loading',
        content: '加载中…',
        duration: 0
      })
      // 获取房源信息
      const res = await axios.get(`http://localhost:8080/area/map?id=${id}`);
      // 调用 getTypeZoom 方法获取级别和类型
      const { nextZoom, type } = this.getTypeZoom();
      res.data.body.forEach(item => {
        this.createOverlays(item, nextZoom, type);
      })
    } catch (error) {
      alert(error.message);
    } finally {
      Toast.clear(); // 关闭加载提醒
    }
  }
  getTypeZoom () {
    // 调用地图的 centerAndZoom
    const zoom = this.map.getZoom();
    let nextZoom, type;
    if (zoom >= 10 && zoom < 12) {
      // 区
      nextZoom = 13; // 下一个缩放级别
      type = 'circle'; // 表示绘制圆形覆盖物
    } else if (zoom >= 12 && zoom < 14) {
      // 镇
      nextZoom = 15;
      type = 'circle';
    } else if (zoom >= 14 && zoom < 16) {
      // 小区
      type = 'rect';
    }
    return {
      nextZoom,
      type
    }
  }
  createOverlays (data, zoom, type) {
    const { coord: { longitude, latitude }, label: name, count, value } = data; // 获取房源信息
    // 创建对象坐标
    const areaPoint = new window.BMapGL.Point(longitude, latitude);
    if (type === 'circle') {
      // 区或镇
      this.createCircle(areaPoint, name, count, value, zoom);
    } else {
      // 小区
      this.createRect(areaPoint, name, count, value);
    }
  }
  createCircle (point, name, count, id, zoom) {
    // 添加覆盖文本
    const label = new window.BMapGL.Label('', {       // 创建文本标注
      position: point,  // 设置标注的地理位置
      offset: new window.BMapGL.Size(-35, -35) // 设置标注的偏移量
    })
    // 给每个覆盖物设置唯一标识
    label.id = id;
    // 设置覆盖物内容
    label.setContent(
      `<div class="${styles.bubble}">
      <p class="${styles.name}">${name}</p>
      <p>${count}套</p>
    </div>`
    )
    label.setStyle({
      // 设置label的样式
      cursor: 'pointer',
      border: '0px solid rgb(255, 0, 0)',
      padding: '0px',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      color: 'rgb(255, 255, 255)',
      textAlign: 'center',
    })
    // 监听标注事件
    label.addEventListener("click", () => {
      this.renderOverlays(id);
      // 放大地图
      this.map.centerAndZoom(point, zoom);
      // 清除地图上所有覆盖物
      this.map.clearOverlays();
    });
    // 将标注添加到地图中
    this.map.addOverlay(label);
  }
  createRect (point, name, count, id) {
    // 添加覆盖文本
    const label = new window.BMapGL.Label('', {       // 创建文本标注
      position: point,  // 设置标注的地理位置
      offset: new window.BMapGL.Size(-50, -28) // 设置标注的偏移量
    })
    // 给每个覆盖物设置唯一标识
    label.id = id;
    // 设置覆盖物内容
    label.setContent(
      `<div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>`
    )
    label.setStyle({
      // 设置label的样式
      cursor: 'pointer',
      border: '0px solid rgb(255, 0, 0)',
      padding: '0px',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      color: 'rgb(255, 255, 255)',
      textAlign: 'center',
    })
    // 监听标注事件
    label.addEventListener("click", (e) => {
      this.getHousesList(id);
      // 获取当前被点击对象
      const target = e.domEvent.changedTouches[0];
      this.map.panBy(
        window.innerWidth / 2 - target.clientX,
        (window.innerHeight - 330) / 2 - target.clientY
      )
    });
    // 将标注添加到地图中
    this.map.addOverlay(label);
  }
  async getHousesList (id) {
    try {
      Toast.show({
        icon: 'loading',
        content: '加载中…',
      })
      const res = await axios.get(`http://localhost:8080/houses?cityId=${id}`);
      this.setState({
        housesList: res.data.body.list,
        isShowList: true
      })
    } catch (error) {
      alert(error.message);
    } finally {
      Toast.clear();
    }
  }
  // 渲染房屋列表
  renderHouses() {
    return (
      this.state.housesList.map(item => (
        <div className={styles.house} key={item.houseCode}>
          <div className={styles.imgWrap}>
            <img
              className={styles.img}
              src={`http://localhost:8080${item.houseImg}`}
              alt=""
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.desc}>{item.desc}</div>
            <div>
              {item.tags.map((tag, index) => {
                const tagClass = 'tag' + (index + 1);
                return (
                  <span
                    className={[styles.tag, styles[tagClass]].join(' ')}
                    key={tag}
                  >
                    {tag}
                  </span>
                )
              })}
            </div>
            <div className={styles.price}>
              <span className={styles.priceNum}>{item.price}</span> 元/月
            </div>
          </div>
        </div>
      ))
    )
  }
  render () {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        {/* 地图容器 */}
        <div id="container" className={styles.container} />
          {/* 房源列表 */}
          {/* 添加 styles.show 展示房屋列表 */}
          <div
            className={[
              styles.houseList,
              this.state.isShowList ? styles.show : ''
            ].join(' ')}
          >
            <div className={styles.titleWrap}>
              <h1 className={styles.listTitle}>房屋列表</h1>
              <Link className={styles.titleMore} to="/home/list">
                更多房源
              </Link>
            </div>

            <div className={styles.houseItems}>
              {/* 房屋结构 */}
              {this.renderHouses()}
            </div>
          </div>
      </div>
    );
  }
}

export default index;