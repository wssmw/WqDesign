<script setup></script>
<template>
  <div class="flex">
    <div class="item item_1">
      <h3>默认对齐（align-content: stretch）</h3>
      <div class="father father_1">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
      </div>
    </div>
    <div class="item item_2">
      <h3>align-content: flex-start</h3>
      <div class="father father_2">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
      </div>
    </div>
    <div class="item item_3">
      <h3>align-content: flex-end</h3>
      <div class="father father_3">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
      </div>
    </div>
    <div class="item item_4">
      <h3>align-content: center</h3>
      <div class="father father_4">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
      </div>
    </div>
    <div class="item item_5">
      <h3>align-content: space-between</h3>
      <div class="father father_5">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
      </div>
    </div>
    <div class="item item_6">
      <h3>align-content: space-around</h3>
      <div class="father father_6">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
      </div>
    </div>
    <div class="item item_7">
      <h3>align-content: space-evenly</h3>
      <div class="father father_7">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  .item {
    flex: 1 1 300px;
    min-width: 320px;
    .father {
      display: flex;
      flex-wrap: wrap;
      width: 200px;
      height: 200px;
      background: #f5f5f5;
      align-content: stretch;
      .child {
        width: 60px;
        height: 60px;
        background-color: pink;
        margin: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
    }
  }
  .father_2 {
    align-content: flex-start;
  }
  .father_3 {
    align-content: flex-end;
  }
  .father_4 {
    align-content: center;
  }
  .father_5 {
    align-content: space-between;
  }
  .father_6 {
    align-content: space-around;
  }
  .father_7 {
    align-content: space-evenly;
  }
}
</style>
