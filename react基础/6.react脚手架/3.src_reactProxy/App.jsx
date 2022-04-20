import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {
  getStudentData = () => {
    axios.get('http://localhost:3000/api1/students').then(
      r => {console.log(r.data);},
      e => {console.log(e);}
    )
  }

  getCarData = () => {
    axios.get('http://localhost:3000/api2/cars').then(
      r => {console.log(r.data);},
      e => {console.log(e);}
    )
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.getStudentData}>获取学生数据</button>
          <button onClick={this.getCarData}>获取汽车数据</button>
        </div>
      </div>
    )
  }
}

