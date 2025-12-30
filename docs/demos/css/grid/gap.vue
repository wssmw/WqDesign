<script setup></script>
<template>
  <div class="grid">
    <div class="item item_1">
      <h3>1.px</h3>
      <div class="father father_1">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
        <div class="child">7</div>
        <div class="child">8</div>
        <div class="child">9</div>
      </div>
    </div>
    <div class="item item_2">
      <h3>1.px</h3>
      <div class="father father_1">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
        <div class="child">7</div>
        <div class="child">8</div>
        <div class="child">9</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.grid {
  .item {
    .father {
      display: grid;
      grid-template-columns: 40px 40px 40px;
      grid-auto-rows: 40px;
      gap: 20px 100px;
      .child {
        background-color: pink;
        font-size: 18px;
      }
    }
  }
  .item_2 {
    .father {
      row-gap: 10px;
      column-gap: 100px;
    }
  }
}
</style>
