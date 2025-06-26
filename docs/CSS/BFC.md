# 什么是BFC
BFC 是 CSS 中的一个渲染机制，它决定了块级元素如何布局，并影响其子元素和外部的交互方式。BFC 内的元素不会影响外部的布局，反之亦然。

## BFC的作用
1. 防止外边距（margin）重叠

2. 清除浮动（避免父元素高度塌陷）

3. 阻止元素被浮动元素覆盖

## 如何触发BFC
1. float: left | right（不为 none）

2. position: absolute | fixed

3. display: inline-block | table-cell | flex | grid 等

4. overflow: hidden | auto | scroll（不为 visible）

## 1.防止外边距（margin）重叠
<preview path="../demos/css/bfc/base.vue" title="基础用法" description="防止外边距（margin）重叠"></preview>

## 2.清除浮动（避免父元素高度塌陷）
<preview path="../demos/css/bfc/base1.vue" title="基础用法" description="清除浮动（避免父元素高度塌陷）"></preview>

## 3.阻止元素被浮动元素覆盖

<preview path="../demos/css/bfc/base2.vue" title="基础用法" description="阻止元素被浮动元素覆盖"></preview>