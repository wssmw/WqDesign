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
      <h3>2.%(百分比)</h3>
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
    <div class="item item_3">
      <h3>3.fr(比例值)</h3>
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
    <div class="item item_4">
      <h3>3.fr(比例值)</h3>
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
      grid-template-rows: 40px;
      .child {
        background-color: pink;
        margin: 4px;
        font-size: 18px;
      }
    }
  }
  .item_2 {
    .father {
      grid-template-columns: 10% 40% 50%;
    }
  }
  .item_3 {
    .father {
      grid-template-columns: 2fr 4fr 5fr;
    }
  }
  .item_4 {
    .father {
      grid-template-columns: 200px 10%;
    }
  }
}
</style>
