# API 的生成

使用第三方插件： apidoc
该插件可以通过代码里面的注释自动生成 API 文档

1.安装该插件：

- npm install apidoc -g

2.对指定文件目录的注释进行解析

- apidoc -i 想要解析的文件目录 -o 最后生成文件的目录
apidoc -i ./ -o ./api

## API 的配置文件

可以在根目录下创建一个 apidoc.json 的配置文件
可以配置 API 的名字和描述，最主要的是要配置路径和端口号
