<script setup></script>
<template>
  <div class="flex">
    <div class="item item_1">
      <h3>默认对齐（align-self: auto）</h3>
      <div class="father">
        <div class="child">auto</div>
        <div class="child">auto</div>
        <div class="child">auto</div>
      </div>
    </div>
    <div class="item item_2">
      <h3>align-self: flex-start</h3>
      <div class="father">
        <div class="child self-start">flex-start</div>
        <div class="child">auto</div>
        <div class="child">auto</div>
      </div>
    </div>
    <div class="item item_3">
      <h3>align-self: flex-end</h3>
      <div class="father">
        <div class="child self-end">flex-end</div>
        <div class="child">auto</div>
        <div class="child">auto</div>
      </div>
    </div>
    <div class="item item_4">
      <h3>align-self: center</h3>
      <div class="father">
        <div class="child self-center">center</div>
        <div class="child">auto</div>
        <div class="child">auto</div>
      </div>
    </div>
    <div class="item item_5">
      <h3>align-self: baseline</h3>
      <div class="father">
        <div class="child self-baseline">baseline</div>
        <div class="child">auto</div>
        <div class="child">auto</div>
      </div>
    </div>
    <div class="item item_6">
      <h3>align-self: stretch</h3>
      <div class="father">
        <div class="child self-stretch">stretch</div>
        <div class="child">auto</div>
        <div class="child">auto</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.flex {
  .item {
    margin-bottom: 24px;
    .father {
      display: flex;
      height: 120px;
      background: #f5f5f5;
      .child {
        width: 60px;
        background-color: pink;
        margin: 10px;
        font-size: 16px;
        line-height: 1.2;
        text-align: center;
        padding-top: 10px;
        height: 40px;
        align-self: auto;
      }
      .self-start {
        align-self: flex-start;
      }
      .self-end {
        align-self: flex-end;
      }
      .self-center {
        align-self: center;
      }
      .self-baseline {
        align-self: baseline;
        font-size: 24px;
        line-height: 40px;
      }
      .self-stretch {
        align-self: stretch;
        height: auto;
      }
    }
  }
}
</style>
