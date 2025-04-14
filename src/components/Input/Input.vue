<template>
  <input
    class="input"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style scoped>
.input {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #1890ff;
}

.input.disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
