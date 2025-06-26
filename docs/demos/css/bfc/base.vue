<template>
  <div class="bfc-margin-demo">
    <div class="demo_1">
      <div class="left">
        <h3>1. 未触发BFC（margin塌陷）</h3>
        <div class="top">
          <div class="box"></div>
        </div>
        <div class="bottom">
          <div class="box"></div>
        </div>
      </div>
      <div class="right">
        <h3>2. 触发BFC（margin不塌陷）</h3>
        <div class="top"><div class="box"></div></div>
        <div class="bottom"><div class="box"></div></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bfc-margin-demo {
  .box {
    width: 40px;
    height: 40px;
    background-color: pink;
  }
  .demo_1 {
    display: flex;
    .left {
      .top,
      .bottom {
        .box {
          margin: 40px;
        }
      }
    }
    .right {
      .top,
      .bottom {
        display: flex;
        overflow: hidden;
        .box {
          margin: 40px;
        }
      }
    }
  }
}
</style>
