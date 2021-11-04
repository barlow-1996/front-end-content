# json

JSON是一种传输数据的格式（本质上就是对象，但用途有区别，对象是在本地用，json是在传输用）

- JSON.parse();    string --> json
- JSON.stringify();  json --> string

undefined、function、symbol 在转换时会被忽略(出现在对象的属性值中)或被转换成null(出现在数组中)
function、undefined 被单独转换时会返回 undefined

```javascript
var a = function(){};
var b = [1,a];
console.log(JSON.stringify(a)); // undefined
console.log(JSON.stringify({a})) // "{}"
console.log(JSON.stringify(b)) // "[1, null]"
```
