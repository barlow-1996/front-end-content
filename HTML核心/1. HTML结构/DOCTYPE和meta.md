# doctype

定义在 html 文件的第一行 `<!DOCTYPE>`
文档声明，告诉浏览器当前使用的 HTML 标准(如果有该声明则使用标准模式，没声明则使用怪异模式)

- 标准模式：是指浏览器按照 W3C 标准解析代码(最高标准)
- 怪异模式：是指浏览器用自己的方式解析代码(向后兼容)

## meta

meta：是一个辅助性标签，用来定义页面编码语言、搜索引擎优化、自动刷新等

### meta 属性

- http-equiv: 相当于 http 头信息作用，它可向浏览器传一些有用的信息，以帮助浏览器正确地显示网页内容
语法：`<meta http-equiv="参数" content="参数值">`
http-equiv="Content-Type" 表示 HTTP 头部协议，提示浏览器网页信息
http-equiv="Content-Language" 表示语言的设置
http-equiv="expires" 表示缓存的到期时间
http-equiv="cache-control" 表示对缓存文件的设置

- name: 用于描述页面，也有 content 属性，content 中的内容便于搜索引擎查找和分类信息
语法：`<meta name="参数" content="具体的参数值">`
name="keywords" 用来告诉搜索引擎该网页的关键字
name="description" 用来告诉搜索引擎该网页的主要内容
name="author" 用来标注该网页的作者
name="copyright" 用来说明网站版权信息
name="viewport" 用来针对移动端网页，适配

- charset：H5的属性，用于描述该文档的编码信息
语法：`<meta charset="xxx">`
charset="GB2312" 代表采用的编码是简体中文；
charset="BIG5" 代表采用的编码是繁体中文；
charset="ISO-8859-1" 代表采用的编码是英文；
charset="UTF-8" 代表世界通用的语言编码；
