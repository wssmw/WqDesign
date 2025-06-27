<script setup></script>
<template>
  <div class="flex">
    <div class="item item_1">
      <h3>默认排序</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_2">
      <h3>justify-content: center; ( 居中排列 )</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_3">
      <h3>justify-content: start; ( 从起始位置排列 )</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_4">
      <h3>ustify-content: end; ( 从末尾开始排列 )</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_5">
      <h3>justify-content: flex-start; ( 从行首起始位置开始排列 )</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_6">
      <h3>justify-content: flex-end; ( 从行尾位置开始排列 )</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_7">
      <h3>justify-content: left; ( 从左侧开始排列 )</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_8">
      <h3>justify-content: right; ( 从右侧开始排列 )</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_9">
      <h3>
        justify-content: space-between;
        (在每行上均匀分配弹性元素。相邻元素间距离相同。)
      </h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_10">
      <h3>
        justify-content: space-around;
        (在每行上均匀分配弹性元素。相邻元素间距离相同。)
      </h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_11">
      <h3>
        justify-content: space-evenly; (flex
        项都沿着主轴均匀分布在指定的对齐容器中)
      </h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="item item_12">
      <h3>cjustify-content: stretch;</h3>
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
      justify-content: center;
    }
  }
  .item_3 {
    .father {
      justify-content: start;
    }
  }
  .item_4 {
    .father {
      justify-content: end;
    }
  }
  .item_5 {
    .father {
      justify-content: flex-start;
    }
  }
  .item_6 {
    .father {
      justify-content: flex-end;
    }
  }
  .item_7 {
    .father {
      justify-content: left;
    }
  }
  .item_8 {
    .father {
      justify-content: right;
    }
  }
  .item_9 {
    .father {
      justify-content: space-between;
    }
  }
  .item_10 {
    .father {
      justify-content: space-around;
    }
  }
  .item_11 {
    .father {
      justify-content: space-evenly;
    }
  }
  .item_12 {
    .father {
      justify-content: stretch;
    }
  }
}
</style>
