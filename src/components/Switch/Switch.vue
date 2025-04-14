<template>
  <div class="switch" :class="{ 'is-active': modelValue, 'switch--active': modelValue }" @click="toggle">
    <div class="switch__track"></div>
    <div class="switch__thumb"></div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    toggle() {
      this.$emit('update:modelValue', !this.modelValue);
    }
  }
};
</script>

<style scoped>
.switch--active .switch__track {
  background-color: #4CAF50;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  border-radius: 12px;
  background-color: #ddd;
  cursor: pointer;
  transition: background-color 0.3s;
}

.switch.is-active {
  background-color: #409eff;
}

.switch__track {
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border-radius: 10px;
  background-color: #fff;
  transition: transform 0.3s;
}

.switch__thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
}

.switch.is-active .switch__thumb {
  transform: translateX(16px);
}
</style>