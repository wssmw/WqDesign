<template>
  <el-form-item
    :label="info.label"
    :prop="info.key"
    :rules="computedRules"
    :required="info.required"
  >
    <!-- 日期选择器 -->
    <el-date-picker
      v-model="localValue"
      :type="dateType"
      :placeholder="info.placeholder"
      :disabled="isDisabled"
      :readonly="isReadonly"
      :editable="info.editable !== false"
      :clearable="info.clearable !== false && !isReadonly"
      :size="info.size"
      :format="info.format"
      :value-format="info.valueFormat"
      :start-placeholder="info.startPlaceholder || '开始日期'"
      :end-placeholder="info.endPlaceholder || '结束日期'"
      :range-separator="info.rangeSeparator || '至'"
      :shortcuts="info.shortcuts"
      :disabled-date="disabledDate"
      :default-time="info.defaultTime"
      :unlink-panels="info.unlinkPanels"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      @calendar-change="handleCalendarChange"
    >
      <!-- 自定义内容插槽 -->
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
    </el-date-picker>

    <!-- 快速选择按钮 -->
    <div
      v-if="info.quickSelect && dateType.includes('range')"
      class="quick-select"
    >
      <el-button
        v-for="quick in info.quickSelect"
        :key="quick.label"
        type="text"
        size="small"
        @click="handleQuickSelect(quick)"
      >
        {{ quick.label }}
      </el-button>
    </div>

    <!-- 描述文本 -->
    <div v-if="info.description" class="date-description">
      {{ info.description }}
    </div>
  </el-form-item>
</template>

<script setup>
import { computed } from 'vue'
// import dayjs from 'dayjs'

const props = defineProps({
  info: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  modelValue: {
    type: [String, Number, Array, Date],
    default: '',
  },
  operateType: {
    type: String,
    default: 'edit',
  },
})

const emit = defineEmits([
  'update:modelValue',
  'change',
  'blur',
  'focus',
  'calendar-change',
])

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const isDisabled = computed(() => {
  return props.info.disabled || props.operateType === 'view'
})

const isReadonly = computed(() => {
  return props.operateType === 'view' || props.info.readonly
})

// 根据类型映射日期选择器类型
const dateType = computed(() => {
  const typeMap = {
    date: 'date',
    daterange: 'daterange',
    datetime: 'datetime',
    datetimerange: 'datetimerange',
    year: 'year',
    month: 'month',
    dates: 'dates', // 多日期
    week: 'week',
  }
  return typeMap[props.info.type] || 'date'
})

const computedRules = computed(() => {
  const rules = [...(props.info.rules || [])]

  // 必填规则
  if (props.info.required && !rules.some((rule) => rule.required)) {
    const message = dateType.value.includes('range')
      ? `请选择${props.info.label}范围`
      : `请选择${props.info.label}`

    rules.push({
      required: true,
      message: message,
      trigger: dateType.value.includes('range') ? 'change' : 'blur',
    })
  }

  // 自定义验证器
  if (props.info.validator) {
    rules.push({
      validator: props.info.validator,
      trigger: 'change',
    })
  }

  return rules
})

// 禁用日期函数
const disabledDate = computed(() => {
  if (typeof props.info.disabledDate === 'function') {
    return props.info.disabledDate
  }

  if (props.info.disabledDate === 'past') {
    return (date) => date < new Date()
  }

  if (props.info.disabledDate === 'future') {
    return (date) => date > new Date()
  }

  return undefined
})

// 事件处理
const handleChange = (value) => {
  emit('change', value)

  // 如果有处理函数
  if (typeof props.info.onChange === 'function') {
    props.info.onChange(value)
  }
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}

const handleCalendarChange = (dates) => {
  emit('calendar-change', dates)
}

// 快捷选择处理
const handleQuickSelect = (quick) => {
  if (!quick.value || typeof quick.value !== 'function') return

  const result = quick.value()
  if (result && Array.isArray(result) && result.length === 2) {
    localValue.value = result
    handleChange(result)
  }
}
</script>

<style scoped></style>
