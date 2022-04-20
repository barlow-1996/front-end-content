import React, { Component } from 'react';
import {connect} from 'react-redux'
import { createAddPersonAction } from '../../redux/actions/person';

class Person extends Component {

  addPerson = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value;
    const personObj = {id: this.props.persons.length, name, age};
    this.props.addPerson(personObj);
  }

  render() {
    return (
      <div>
        <h1>Person 组件 --- 上方组件求和为：{this.props.count}</h1>
        <input type="text" ref={c => this.nameNode = c} placeholder="输入姓名" />
        <input type="text" ref={c => this.ageNode = c} placeholder="输入年龄" />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {
            this.props.persons.map(person => {
              return (
                <li key={person.id}>{person.name} ------ {person.age}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  persons: state.persons,
  count: state.sum
});
const mapDispatchToProps = {
  addPerson: createAddPersonAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);