<script setup></script>
<template>
  <div class="flex">
    <div class="item item_1">
      <h3>默认对齐（align-items: stretch）</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_2">
      <h3>align-items: flex-start (从交叉轴起始位置对齐)</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_3">
      <h3>align-items: flex-end (从交叉轴结束位置对齐)</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_4">
      <h3>align-items: center (交叉轴居中对齐)</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_5">
      <h3>align-items: baseline (以文本基线对齐)</h3>
      <div class="father">
        <div class="child baseline">第一个孩子</div>
        <div class="child baseline">第二个孩子</div>
        <div class="child baseline">第三个孩子</div>
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
      }
      .baseline {
        font-size: 24px;
        line-height: 40px;
      }
    }
  }
  .item_2 {
    .father {
      align-items: flex-start;
    }
  }
  .item_3 {
    .father {
      align-items: flex-end;
    }
  }
  .item_4 {
    .father {
      align-items: center;
    }
  }
  .item_5 {
    .father {
      align-items: baseline;
    }
  }
}
</style>
