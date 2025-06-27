<script setup></script>
<template>
  <div class="flex">
    <div class="item item_1">
      <h3>默认不换行</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
        <div class="child">第四个孩子</div>
        <div class="child">第五个孩子</div>
        <div class="child">第六个孩子</div>
        <div class="child">第七个孩子</div>
      </div>
    </div>
    <div class="item item_2">
      <h3>flex-wrap:wrap (默认换行)</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
        <div class="child">第四个孩子</div>
        <div class="child">第五个孩子</div>
        <div class="child">第六个孩子</div>
        <div class="child">第七个孩子</div>
      </div>
    </div>
    <div class="item item_3">
      <h3>flex-wrap: wrap;</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
        <div class="child">第四个孩子</div>
        <div class="child">第五个孩子</div>
        <div class="child">第六个孩子</div>
        <div class="child">第七个孩子</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.flex {
  .item {
    .father {
      display: flex;
      .child {
        width: 100px;
        height: 60px;
        background-color: pink;
        margin: 10px;
        flex-shrink: 0; // 用来控制子元素保持默认大小
      }
    }
  }
  .item_2 {
    .father {
      flex-wrap: wrap;
    }
  }
  .item_3 {
    .father {
      flex-wrap: wrap-reverse;
    }
  }
}
</style>
