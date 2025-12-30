<template>
  <el-form-item
    :label="info.label"
    :prop="info.key"
    :rules="computedRules"
    :required="info.required"
  >
    <!-- 多选框组 -->
    <el-checkbox-group
      v-model="localValue"
      :disabled="isDisabled"
      :size="info.size"
      :min="info.min"
      :max="info.max"
      :text-color="info.textColor"
      :fill="info.fill"
      @change="handleChange"
    >
      <!-- 选项循环 -->
      <template v-if="info.button">
        <!-- 按钮样式 -->
        <el-checkbox-button
          v-for="option in info.options || []"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          :border="info.border"
        >
          {{ option.label }}
        </el-checkbox-button>
      </template>
      <template v-else>
        <!-- 普通样式 -->
        <el-checkbox
          v-for="option in info.options || []"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
          :border="info.border"
          :indeterminate="option.indeterminate"
        >
          {{ option.label }}
        </el-checkbox>
      </template>

      <!-- 自定义选项插槽 -->
      <slot v-if="$slots.default" :options="info.options" />
    </el-checkbox-group>

    <!-- 全选/半选控制 -->
    <div v-if="info.showSelectAll" class="checkbox-actions">
      <el-checkbox
        v-model="selectAll"
        :indeterminate="isIndeterminate"
        @change="handleSelectAll"
      >
        全选
      </el-checkbox>
      <el-button
        v-if="info.showClear"
        type="text"
        size="small"
        @click="handleClear"
      >
        清空
      </el-button>
    </div>

    <!-- 描述文本 -->
    <div v-if="info.description" class="checkbox-description">
      {{ info.description }}
    </div>
  </el-form-item>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  info: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  modelValue: {
    type: Array,
    default: () => [],
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
      message: `请至少选择一项${props.info.label}`,
      trigger: 'change',
      type: 'array',
    })
  }
  if (props.info.min) {
    rules.push({
      validator: (rule, value) => {
        return value.length >= props.info.min
      },
      message: `至少选择${props.info.min}项`,
      trigger: 'change',
    })
  }
  if (props.info.max) {
    rules.push({
      validator: (rule, value) => {
        return value.length <= props.info.max
      },
      message: `最多选择${props.info.max}项`,
      trigger: 'change',
    })
  }
  return rules
})

// 全选逻辑
const selectAll = computed({
  get: () => {
    if (!props.info.options) return false
    const allValues = props.info.options.map((opt) => opt.value)
    return allValues.length > 0 && localValue.value.length === allValues.length
  },
  set: (value) => {
    if (value && props.info.options) {
      const allValues = props.info.options.map((opt) => opt.value)
      emit('update:modelValue', [...allValues])
    } else {
      emit('update:modelValue', [])
    }
  },
})

const isIndeterminate = computed(() => {
  if (!props.info.options) return false
  const allValues = props.info.options.map((opt) => opt.value)
  return (
    localValue.value.length > 0 && localValue.value.length < allValues.length
  )
})

const handleChange = (value) => {
  emit('change', value)
}

const handleSelectAll = (value) => {
  if (value && props.info.options) {
    const allValues = props.info.options
      .filter((opt) => !opt.disabled)
      .map((opt) => opt.value)
    localValue.value = allValues
  } else {
    localValue.value = []
  }
}

const handleClear = () => {
  localValue.value = []
}

// 监听选项变化
watch(
  () => props.info.options,
  () => {
    // 如果选项变化，清空已选值中不存在的选项
    if (props.info.options && localValue.value.length > 0) {
      const validValues = props.info.options.map((opt) => opt.value)
      const filtered = localValue.value.filter((val) =>
        validValues.includes(val),
      )
      if (filtered.length !== localValue.value.length) {
        localValue.value = filtered
      }
    }
  },
  { deep: true },
)
</script>

<style scoped></style>
