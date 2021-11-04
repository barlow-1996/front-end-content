# UI样式

## 边框样式

- border-radius: 用来设置边框圆角
可以为固定的像素值，也可以为百分比值
50%为圆角
默认值为0，不可继承

- border-image-source: 定义使用一张图片来代替边框样式
如果为none，则仍然使用border-style
默认值为none，不可继承

- border-image-slice: 会通过规范将 border-image-source 的图片明确分割成9个区域：四个角，四边以及中心区域，并可指定偏移量
值的百分比参照与image本身
默认值为100%，不可继承

- border-image-repeat: 定义图片如何填充边框。
可为单个值，设置所有的边框；可为两个值，分别设置水平和垂直的边框。
值：stretch（拉伸）、round（平铺）
默认值为stretch，不可继承

- border-image-width: 定义图像边框宽度

- border-image-outset: 定义边框图像可超出边框盒的大小

## 渐变

渐变是图片不是颜色

### 线性渐变

为了创建线性渐变，需要设置一个起始点和方向，以及定义终止色。且必须指定至少两种颜色

- 默认从上到下发生渐变：
  linear-gradient(red, blue)

- 改变渐变方向：
  linear-gradient(to 结束的方向, red, blue)

- 使用角度：
  linear-gradient(角度, red, blue)

### 径向渐变

径向渐变是由原点（渐变中心）向外展开的颜色渐变
默认形状为椭圆
