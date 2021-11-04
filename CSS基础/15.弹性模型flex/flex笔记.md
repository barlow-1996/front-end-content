# flex（弹性盒子） 布局

要参与布局的每一个元素被称为项目，项目外包裹的父元素被称为容器
在flex布局中，平面坐标系被分为了主轴和侧轴(主轴默认为 X 轴，侧轴为反方向的 Y 轴)
项目永远沿主轴的正方向进行排列
flex 一般用于移动前端开发

## flex 老版本

老版本通常称为box
将容器的 display属性设置为 -webkit-box
当项目超过容器的长度时，老版本的flex会选择溢出显示

大部分移动端浏览器内核只支持老版本

### 老版本容器

- 容器的布局方向
-webkit-box-orient: horizontal;
该属性用来控制主轴是哪一根 默认值为horizontal（水平）另一个值为vertical（竖直）

- 容器的排列方向
-webkit-box-direction: normal;
该属性用来控制主轴的方向  默认值为normal(正向) 另一个之为reverse（反向）

- 富裕空间管理
富裕空间管理只决定富裕空间的位置，不会给项目分配空间
管理主轴富裕空间:
-webkit-box-pack: start;
start 富裕空间在右边（X轴为主轴） 下边（Y轴为主轴）
end 富裕空间在左边（X轴为主轴） 上边（Y轴为主轴）
center 富裕空间在两边
justify 富裕空间在项目之间

管理侧轴富裕空间:
-webkit-box-align: center;
start 富裕空间在右边（X轴为主轴） 下边（Y轴为主轴）
end 富裕空间在左边（X轴为主轴） 上边（Y轴为主轴）
center 富裕空间在两边

### 老版本项目

- 弹性空间管理
将富裕空间按比例分配到各个项目上
-webkit-box-flex: 1;
默认值为0，不可继承。 比例设为1，则将每个项目等分

## flex 新版本

将容器的 display属性设置为 flex
**当项目超过容器的长度时，新版本的flex会自动缩短项目的长度来撑满容器的长度**

### 新版本容器

- 容器的布局方向
flex-direction: row;
该属性用来控制主轴是哪一根 默认值为row（水平）另一个值为column（竖直）

- 容器的排列方向
flex-direction: row-reverse; 与布局方向同一个属性
该属性用来控制主轴的方向  默认值为normal(正向) 另一个之为reverse（反向）

- 富裕空间管理
富裕空间管理只决定富裕空间的位置，不会给项目分配空间
管理主轴富裕空间:
justify-content: flex-start;
flex-start 富裕空间在主轴的正方向
flex-end 富裕空间在主轴的反方向
center 富裕空间在主轴两边
space-between 富裕空间在项目之间
space-around 富裕空间在项目两边

管理侧轴富裕空间:
align-items: stretch;
flex-start 富裕空间在侧轴的正方向
flex-end 富裕空间在侧轴的反方向
center 富裕空间在侧轴两边
baseline 按基线对齐
stretch 等高布局（前提是不能为项目设置高度）

## 新版本flex新增内容

### 新增容器属性

- flex-wrap：该属性控制了容器为单行/列还是多行/列
且控制了侧轴的方向，新行/列将沿侧轴方向堆砌
默认值为 nowrap，不可继承
值：
nowrap 不换行，自动压缩项目大小
wrap 沿着侧轴正方向换行，且富裕空间被行/列隔开
wrap-reverse 沿着侧轴反方向换行，且富裕空间被行/列隔开

- align-content: 管理多行多列的富裕空间
上面的align-items只能管理单行单列的富裕空间，会把所有行/列看成一个整体
与align-items的值相同

- flex-flow: 是 flex-direction 和 flex-wrap 的简写
控制主轴和侧轴的位置及方向
默认值为 row nowrap，不可继承

### 新增项目属性

- order：该属性规定了弹性容器中可伸缩项目在布局时的顺序，元素按照order属性的值增序进行布局
拥有相同order属性值的元素按照它们编写代码的先后顺序进行布局
order越大越后
默认值为0，不可继承

- align-self: 该属性会对齐当前flex行中的flex元素，并覆盖align-items的值。
如果任何flex元素的侧轴方向margin值设为auto，则会忽略align-self。
值：
auto(默认值) 设置为父元素的align-items值，若该元素没有父元素则设置为stretch
flex-start flex元素会对齐到cross-axis的首端
flex-end flex元素会对齐到cross-axis的尾端
center flex元素会对齐到cross-axis的中间
baseline 所有flex元素按基线对齐
stretch 等高布局（前提是不能为项目设置高度）

- flex-grow: 该属性将富裕空间按比例分配到各个项目上，定义了项目的拉伸因子
flex-grow: 1;  默认值为 0

- flex-shrink：该属性定义了flex元素的收缩因子，默认值为 1

- flex-basis: 该属性指定了flex元素在主轴方向上的初始大小
默认值为auto，不可继承
取 auto 时，基准值为主尺寸值
取 0% 时，把该项目视为零尺寸的，故即便声明主尺寸值也没用
