## 什么是flex
Flexbox (弹性盒子布局) 是 CSS3 中一种强大的布局模式，可以轻松实现各种灵活的响应式布局。

## flex命令
- 容器属性(给父元素的命令)

    1. flex-direction(主轴方向,默认是横向)

    2. flex-wrap(控制是否换行)

    3. justify-content(主轴对齐方式)

    4. align-items(侧轴对齐方式)

    5. align-content(多行对齐方式)

- 项目属性(给盒子里面的子元素的命令)

    1. order(控制项目排列顺序)

    2. flex-grow(定义项目放大比例)

    3. flex-shrink(定义项目缩小比例)

    4. flex-basis(定义项目初始大小)

    5. align-self(单个项目对齐方式)


## 基础使用
flex布局可以让原本占据一行的块级元素自动换行

<preview path="../demos/css/Flex/base.vue" title="基础用法" description="flex的基本效果"></preview>

## 命令效果

## flex-direction
flex布局有两个方向一个是主轴方向,一个是侧轴方向(侧轴与主轴相反,如果主轴是x轴,那么侧轴就是y轴;如果主轴是y轴,那么侧轴就是x轴)

flex-direction是用来修改flex的主轴方向,当给父元素设置了flex布局,则会让子元素横向排列,所以默认是横向(x轴方向),如果你想让他按照你所希望的方向来排列,那么你就可以设置这个字段
- flex-direction: row (横向排列,也是默认值)
- flex-direction: row-reverse (横向排列,但是方向相反)
- flex-direction: column (纵向排列)
- flex-direction: column-reverse (纵向排列,但是方向相反)

<preview path="../demos/css/Flex/flexDirection.vue" title="基础用法" description="flex-direction的基本效果"></preview>

## flex-wrap
当子元素过多的时候,就会出现一个问题,默认是不会换行的

flex-wrap用来当子元素过多导致父元素一行放不下时,是否换行

- flex-wrap: nowrap (不换行,也是默认值)
- flex-wrap: wrap (换行)
- flex-wrap: wrap-reverse (换行且反转)

<preview path="../demos/css/Flex/flexWrap.vue" title="基础用法" description="flex-wrap的基本效果"></preview>

## justify-content
主轴的对齐方式 (这里的主轴取决你设置的主轴方向)

1. justify-content: center; ( 居中排列 )
2. justify-content: start; ( 从起始位置排列 )
3. justify-content: end; ( 从末尾开始排列 )
4. justify-content: flex-start; ( 从行首起始位置开始排列 )
5. justify-content: flex-end; ( 从行尾位置开始排列 )
6. justify-content: left; ( 从左侧开始排列 )
7. justify-content: right; ( 从右侧开始排列 )
8. justify-content: space-between; (在每行上均匀分配弹性元素。相邻元素间距离相同。)
9. justify-content: space-around; (在每行上均匀分配弹性元素。相邻元素间距离相同。)
10. justify-content: space-evenly; (flex 项都沿着主轴均匀分布在指定的对齐容器中)
11. justify-content: stretch; 

<preview path="../demos/css/Flex/justifyContent.vue" title="基础用法" description="justify-content的基本效果"></preview>

## align-items
align-items 用于设置所有子元素在侧轴（交叉轴）上的对齐方式。它决定了子元素在容器内的垂直（或水平方向，取决于主轴方向）排列方式。

- align-items: stretch (默认值，子元素会被拉伸以填满容器)
- align-items: flex-start (从交叉轴的起始位置对齐)
- align-items: flex-end (从交叉轴的结束位置对齐)
- align-items: center (在交叉轴上居中对齐)
- align-items: baseline (以子元素的文本基线对齐)

<preview path="../demos/css/Flex/alignItems.vue" title="基础用法" description="align-items 的基本效果"></preview>

## align-content
当有多行 flex 项时，align-content 用于设置这些行在侧轴（交叉轴）上的对齐方式。只有在有多行内容时才会生效。

- align-content: stretch (默认值，多行会被拉伸以填满容器)
- align-content: flex-start (从交叉轴起始位置对齐)
- align-content: flex-end (从交叉轴结束位置对齐)
- align-content: center (在交叉轴上居中对齐)
- align-content: space-between (多行之间均匀分布，首行在起始，末行在结束)
- align-content: space-around (多行之间均匀分布，每行两侧间距相等)
- align-content: space-evenly (多行之间的间距完全相等)

<preview path="../demos/css/Flex/alignContent.vue" title="基础用法" description="align-content 的基本效果"></preview>

## align-self
align-self 用于设置单个项目在侧轴（交叉轴）上的对齐方式，可以覆盖父元素的 align-items 设置。

- align-self: auto (默认值，继承父元素的 align-items)
- align-self: flex-start (从交叉轴起始位置对齐)
- align-self: flex-end (从交叉轴结束位置对齐)
- align-self: center (在交叉轴上居中对齐)
- align-self: baseline (以文本基线对齐)
- align-self: stretch (拉伸以填满容器)

<preview path="../demos/css/Flex/alignSelf.vue" title="基础用法" description="align-self 的基本效果"></preview>

---

以上就是 Flex 布局的常用属性和用法，通过合理搭配这些属性，可以实现各种灵活的响应式布局。