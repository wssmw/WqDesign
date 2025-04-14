<template>
  <button
    class="button"
    :class="[type, size, { disabled: disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'default', // 默认按钮样式
      validator: (value) => {
        return ['default', 'primary', 'success', 'warning', 'danger'].includes(
          value,
        )
      },
    },
    size: {
      type: String,
      default: 'medium', // 默认中等大小
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false, // 默认不禁用
    },
  },
  methods: {
    handleClick(e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    },
  },
}
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
  border: 1px solid transparent;
  padding: 0 16px;
  font-size: 14px;
  line-height: 1;
}

/* 按钮类型样式 */
.default {
  background: #fff;
  color: #333;
  border-color: #d9d9d9;
}

.primary {
  background: #1890ff;
  color: #fff;
}

.success {
  background: #52c41a;
  color: #fff;
}

.warning {
  background: #faad14;
  color: #fff;
}

.danger {
  background: #f5222d;
  color: #fff;
}

/* 按钮尺寸样式 */
.small {
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
}

.medium {
  height: 32px;
}

.large {
  height: 40px;
  padding: 0 24px;
  font-size: 16px;
}

/* 禁用状态 */
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
