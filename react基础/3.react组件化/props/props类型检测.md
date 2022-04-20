# props 类型检测

进行类型检测必须引入 props-types 库【react 15.x 版本以后该库就不包含在 react 中】

1. 安装 prop-types 库
`npm install props-types`
2. 导入 prop-types 库
import PropTypes from 'props-types'
3. 给组件添加校验规则

```javascript
// 函数式组件：
App.propTypes = {
  name: PropTypes.string.isRequired, // name 的值必须是字符串类型，且必需
  hobbies: PropTypes.array,
  speak: PropTypes.func // speak 的值必须是函数类型
}
// 设置默认值
Person.defaultProps = {
  sex: '男'
}

// 类式组件：
// 在组件内部添加静态对象
static propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string,
  age: PropTypes.number,
  speak: PropTypes.func 
}
// 设置默认值
static defaultProps = {
  sex: '男'
}
```

## 约束规则

1. 常见指定类型: array/bool/func/number/object/string
2. React元素类型: element
3. 指定为必需项: isRequired
4. 指定特定结构的对象: shape({
  color: PropTypes.string,
  fontSize: PropTypes.number
})
