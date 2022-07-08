# 什么是DOM

1. DOM --> Document Object Model
2. DOM 是由 W3C 组织制定的接口，通过 JS 可对网页进行一些操作。DOM对象即为宿主对象，由浏览器厂商定义，用来操作HTML和XML功能的一类对象的集合。

## DOM 结点元素的选择

- document // 代表整个文档

- document.documentElement // 代表整个 html 标签

- document.body // 代表 html 中的 body 标签
document.body.parentElement == document.documentElement // true

- document.getElementByID // 通过ID选择DOM元素
若不存在带有相应ID的元素，则返回 null

- document.getElementsByTagName() // 通过标签名选择
返回一个包含零或多个元素的 nodeList
document.getElementByTagName("*") // 选择所有节点

- document.getElementsByName() // 只有部分标签name可生效（表单、img、iframe）
也返回一个 nodeList
- document.getElementsByClassName() // 通过类名选择

- document.querySelector() // 通过选择器选择匹配的第一个元素
element.querySelector() // 通过元素节点调用该方法时，只会匹配该元素内的后代元素

- document.querySelectorAll() // 选择该选择器匹配的所有元素
document.querySelectorAll("*") // 选择所有节点

### 节点属性

- parentNode // 选择该元素的父节点
- childNodes // 选择该元素的子节点
- firstChild // 选择该元素的第一个子节点  等于 childNodes[0]
- lastChild // 选择该元素的最后一个子节点  等于 childNodes[someNode.childNodes.length-1]
- nextSibling // 后一个兄弟节点
- previousSibling // 前一个兄弟节点
- nodeType // 返回节点类型
节点类型————— NodeType
元素节点————— 1
属性节点————— 2
文本节点————— 3
注释节点————— 8
文档节点————— 9 (document)
文档片段节点————— 11(documentFragment)
- nodeName // 返回该节点标签名
- ownerDocument // 选择整个文档的文档节点

### 遍历元素节点

- parentElement // 选择该元素的父元素节点
- children // 选择该元素的子元素
- childElementCount // 返回子元素的个数
- firstElementChild // 第一个子元素节点
- lastElementChild // 最后一个子元素节点
- previousElementSibling // 前一个兄弟元素节点
- nextElementSibling // 后一个兄弟元素节点

### 创建节点

- document.createElement('') // 创建元素节点
- document.createTextNode('') // 创建文本节点
- document.createComment('') // 创建注释节点
- document.createDocumentFragment() // 创建文档碎片节点

文档碎片相当于一个容器，当需要添加大量元素到 DOM 树时，先添加到文档碎片中，再将文档碎片添加到需要插入的位置，大大减少dom操作，提高性能
普通方式：(操作了100次 dom):
for(var i=100; i>0; i--){
    var elem = document.createElement('div');
    document.body.appendChild(elem);//放到body中
}
文档碎片：(操作1次dom):
 var fragment = document.createDocumentFragment();
 for(var i = 100; i > 0; i--){
      var elem = document.createElement('div');
      fragment.appendChild(elem);
 }
 //最后放入到页面上
document.body.appendChild(fragment);

注：新创建的节点只是被创建出来而已，但尚未被添加到 DOM 树中，因此不会影响浏览器的显示。如果要添加到 DOM 树，要用下面的方法将节点插入进去。

## 插入、删除、替换节点

### 插入

- PARENTNODE.appendChild() // 相当于.push，用于向 childNodes 列表末尾添加一个节点

例：var div = document.createElement('div');
    var text = document.createTextNode('123');
    div.appendChild(text);
    document.body.appendChild(div);

    document.body.appendChild(""); // 用该方法把 document.createElement('') 创建的元素插入到页面上

- PARENTNODE.insertBefore(a,b) // insert a before b，被插入的节点a会变成参照节点b的前一个同胞节点(previousSibling)
例： div.insertBefore(strong,span);
// 将strong插入到div中成为子元素，且在子元素span之前

### 删除

- parent.removeChild(node) // 删除子节点
例：div.removeChild(span);

- child.remove() // 自己删除自己
例: span.remove();

### 替换

- parent.replaceChild(new, origin) // 新的元素节点去替换父节点原来的元素子节点
例： div.replaceChild(strong, span);

## DOM基本操作

### 元素节点的一些属性

- ele.innerHTML = "" // 改变该元素的HTML内容

### 元素节点的一些方法

- ele.setAttribute("","") //给该元素节点设置属性。如果属性已经存在，则该指定的值将会覆盖原来的值
例： div.setAttribute("id","demo");
// 给该div设置一个叫“demo”的id

- ele.getAttribute("") // 得到该元素节点的属性信息。如果属性不存在，则返回 null
例： div.getAttribute("id");
// 返回该div的id名

- ele.removeAttribute("") // 彻底删除元素节点的属性。不仅会清除属性的值，也会完全删除元素节点的属性

- ele.cloneNode() // 得到该节点的一个完全相同的副本。可以传入一个布尔值的参数，表示是否执行深复制
例： div.cloneNode(true); // 表示深复制，复制这个div节点以及它的整个子节点树
    div.cloneNode(false); // 表示浅复制，只复制这个div节点本身

## 元素类名的增删改查

使用 classList 属性提供的方法对元素类名进行添加、删除、查找和切换

- classList.add(value) 将给定字符串添加到类名列表中，若已存在就不添加了
例：div.classList.add('user');

- classList.remove(value) 从类名列表中删除给定的字符串
例：div.classList.remove('user');

- classList.contains(value) 查找类名列表中是否存在给定的值。有则返回 true
例：if(div.classList.contains('user')){...}

- classList.toggle(value) 若类名列表中已存在，删除它；若没有，添加它
例：div.classList.toggle('user');
