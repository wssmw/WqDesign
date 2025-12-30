<template>
  <el-form-item
    :label="info.label"
    :prop="info.key"
    :rules="computedRules"
    :required="info.required"
  >
    <!-- 单选框组 -->
    <el-radio-group
      v-model="localValue"
      :disabled="isDisabled"
      :size="info.size"
      :text-color="info.textColor"
      :fill="info.fill"
      @change="handleChange"
    >
      <!-- 选项循环 -->
      <template v-if="info.button">
        <!-- 按钮样式 -->
        <el-radio-button
          v-for="option in info.options || []"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          :border="info.border"
        >
          {{ option.label }}
        </el-radio-button>
      </template>
      <template v-else>
        <!-- 普通样式 -->
        <el-radio
          v-for="option in info.options || []"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          :border="info.border"
        >
          {{ option.label }}
        </el-radio>
      </template>

      <!-- 自定义选项插槽 -->
      <slot v-if="$slots.default" :options="info.options" />
    </el-radio-group>

    <!-- 垂直排列 -->
    <div v-if="info.layout === 'vertical'" class="radio-vertical">
      <el-radio
        v-for="option in info.options || []"
        :key="option.value"
        v-model="localValue"
        :label="option.value"
        :disabled="option.disabled || isDisabled"
        class="radio-vertical-item"
      >
        {{ option.label }}
      </el-radio>
    </div>

    <!-- 描述文本 -->
    <div v-if="info.description" class="radio-description">
      {{ info.description }}
    </div>
  </el-form-item>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  info: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  operateType: {
    type: String,
    default: 'edit',
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const isDisabled = computed(() => {
  return props.info.disabled || props.operateType === 'view'
})

const computedRules = computed(() => {
  const rules = [...(props.info.rules || [])]
  if (props.info.required && !rules.some((rule) => rule.required)) {
    rules.push({
      required: true,
      message: `请选择${props.info.label}`,
      trigger: 'change',
    })
  }
  return rules
})

const handleChange = (value) => {
  emit('change', value)
}
</script>

<style scoped></style>
