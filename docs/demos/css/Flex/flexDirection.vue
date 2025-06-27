<script setup></script>
<template>
  <div class="flex">
    <div class="item item_1">
      <h3>默认方向</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_2">
      <h3>row-reverse方向</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_3">
      <h3>column方向</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_4">
      <h3>column-reverse方向</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
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
        width: 60px;
        height: 60px;
        background-color: pink;
        margin: 10px;
      }
    }
  }
  .item_2 {
    .father {
      flex-direction: row-reverse;
    }
  }
  .item_3 {
    .father {
      flex-direction: column;
    }
  }
  .item_4 {
    .father {
      flex-direction: column-reverse;
    }
  }
}
</style>
