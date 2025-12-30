## 什么是Grid
Grid布局即网格布局，是目前唯一一种 CSS二维布局 方案，将一个元素划分为 行 和 列

## Grid命令
- 容器属性(给父元素的命令)

    1. grid-template-columns(设置列宽)

    2. grid-template-rows(设置行高)

    3. gap (row-gap/column-gap) (行间距/列间距)



- 项目属性(给盒子里面的子元素的命令)

    1. order(控制项目排列顺序)

    2. flex-grow(定义项目放大比例)

    3. flex-shrink(定义项目缩小比例)

    4. flex-basis(定义项目初始大小)

    5. align-self(单个项目对齐方式)

## 命令效果

## grid-template-columns/grid-template-rows
grid-template-columns设置每个元素的列宽,grid-template-rows设置每个元素的行高
- 绝对值px
- 百分比%
- 比例值 fr:fr 单位代表网格容器中可用空间的几等份；

<preview path="../demos/css/grid/base.vue" title="grid-template-columns" description="grid-template-columns的使用"></preview>

## gap(row-gap/column-gap)
row-gap设置行间距,column-gap设置列间距,gap是上面两个的缩写( gap: row-gap colums-gap )

<preview path="../demos/css/grid/gap.vue" title="grid-template-columns" description="grid-template-columns的使用"></preview>

