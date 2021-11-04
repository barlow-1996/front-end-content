# NodeList 和 HTMLCollection 区别

NodeList 是节点集合(包括元素节点、文本节点、注释节点等)
HTMLCollection 是元素集合(只包括元素节点)

element.childNodes 返回类型是 NodeList
element.children 返回类型是 HTMLCollection

document.getElementsByxxx 返回类型是 HTMLCollection

## 相同点

都是类数组，都有 length 属性，都能通过索引值取得元素

HTMLCollection 有一个 nameItem() 方法，可返回集合中 name 属性和 id 属性值的元素
