# 使用 antd

ant-design 是蚂蚁金服出的一款基于 react 的开源组件库，简称 antd

1. 安装 antd
`npm install antd --save`

2. 引入所需的 UI 组件及 antd 样式表
`import {Button} from 'antd'`
`import 'antd/dist/antd.css';`

3. 在官网相应的 UI 组件代码放入组件即可

```html
render () {
  return (
    <div>
      <Button type="primary">antd 的按钮样式</Button>
    </div>
  )
}
```

## 按需加载样式

通过 `import 'antd/dist/antd.css';` 会全局引入样式，导致文件过大

按需引入：

1. 安装 craco 和 babel-plugin-import：
`npm i @craco/craco`
`npm i babel-plugin-import --save`
2. 修改 package.json 里的 scripts 属性：
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
}
3. 在项目根目录创建一个 craco.config.js 用于修改默认配置，配置如下：

```javascript
module.exports = {
  babel: {
    plugins: [['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }]],
  }
};
```

以上就实现了 antd 的按需引入样式，此后就无需再引入 `import 'antd/dist/antd.css';`

## 自定义主题

antd 中的主题是通过 less 进行配置的，所以需要引入 less 来加载和改变变量

1. 安装 craco-less(里面自带 less-loader)：
`npm i craco-less`
如果是全局引入，则需要将引入文件 `import 'antd/dist/antd.css';` 改为 `import 'antd/dist/antd.less';`
2. 添加 craco.config.js 配置(需要先引入 CracoLessPlugin)：

```javascript
const CracoLessPlugin = require('craco-less');
module.exports = {
  babel: {
    plugins: [['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true, // 这里要改为 true, 因为 style 不再为 css 了，而是变为了 less
    }]],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' }, // 该配置项能自定义主题颜色
            javascriptEnabled: true,
          },
        },
      },
    },
  ]
};
```
