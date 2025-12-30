<template>
  <el-form-item
    :label="info.label"
    :prop="info.key"
    :rules="computedRules"
    :required="info.required"
    :label-width="info.labelWidth"
  >
    <!-- 开关组件 -->
    <el-switch
      v-model="localValue"
      :disabled="isDisabled"
      :active-text="activeText"
      :inactive-text="inactiveText"
      :active-value="activeValue"
      :inactive-value="inactiveValue"
      :active-color="activeColor"
      :inactive-color="inactiveColor"
      :width="switchWidth"
      :inline-prompt="info.inlinePrompt"
      :size="computedSize"
      :loading="info.loading"
      :before-change="handleBeforeChange"
      @change="handleChange"
      @click="handleClick"
    />

    <!-- 描述文本 -->
    <div v-if="info.description" class="switch-description">
      {{ info.description }}
    </div>

    <!-- 自定义内容插槽 -->
    <div v-if="$slots.default" class="switch-slot">
      <slot :value="localValue" />
    </div>

    <!-- 额外信息 -->
    <div v-if="showExtraInfo" class="switch-extra">
      <div v-if="info.extraOn" class="extra-on">
        <el-icon v-if="info.extraIconOn"
          ><component :is="info.extraIconOn"
        /></el-icon>
        <span>{{ info.extraOn }}</span>
      </div>
      <div v-if="info.extraOff" class="extra-off">
        <el-icon v-if="info.extraIconOff"
          ><component :is="info.extraIconOff"
        /></el-icon>
        <span>{{ info.extraOff }}</span>
      </div>
    </div>
  </el-form-item>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const props = defineProps({
  info: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  modelValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  operateType: {
    type: String,
    default: 'edit',
  },
})

const emit = defineEmits([
  'update:modelValue',
  'change',
  'click',
  'before-change',
])

// 响应式数据
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

// 上一次的值（用于确认弹窗）
const lastValue = ref(props.modelValue)

// 计算属性
const isDisabled = computed(() => {
  return props.info.disabled || props.operateType === 'view'
})

const activeText = computed(() => {
  return props.info.activeText || ''
})

const inactiveText = computed(() => {
  return props.info.inactiveText || ''
})

const activeValue = computed(() => {
  return props.info.activeValue !== undefined ? props.info.activeValue : true
})

const inactiveValue = computed(() => {
  return props.info.inactiveValue !== undefined
    ? props.info.inactiveValue
    : false
})

const activeColor = computed(() => {
  return props.info.activeColor || '#13ce66'
})

const inactiveColor = computed(() => {
  return props.info.inactiveColor || '#ff4949'
})

const switchWidth = computed(() => {
  // 如果有文字，自动调整宽度
  if (props.info.activeText || props.info.inactiveText) {
    return props.info.width || 60
  }
  return props.info.width || 40
})

const computedSize = computed(() => {
  return props.info.size || 'default'
})

const showExtraInfo = computed(() => {
  return props.info.extraOn || props.info.extraOff
})

// 验证规则
const computedRules = computed(() => {
  const rules = [...(props.info.rules || [])]

  // 必填规则（开关的必填通常表示必须开启）
  if (props.info.required && !rules.some((rule) => rule.required)) {
    rules.push({
      required: true,
      message: `请开启${props.info.label}`,
      trigger: 'change',
      validator: (rule, value) => {
        return value === activeValue.value
      },
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

// 事件处理
const handleChange = (value) => {
  emit('change', value)

  // 执行自定义 change 回调
  if (typeof props.info.onChange === 'function') {
    props.info.onChange(value, lastValue.value)
  }

  // 如果有确认弹窗配置
  if (props.info.confirm) {
    handleConfirm(value)
  }

  // 更新上一次的值
  lastValue.value = value
}

const handleClick = (event) => {
  emit('click', event)

  if (typeof props.info.onClick === 'function') {
    props.info.onClick(event)
  }
}

const handleBeforeChange = () => {
  emit('before-change')

  // 如果有 beforeChange 配置，返回 Promise
  if (typeof props.info.beforeChange === 'function') {
    return props.info.beforeChange()
  }

  // 如果有确认弹窗
  if (props.info.confirm) {
    return showConfirmDialog()
  }

  return true
}

// 确认弹窗
const showConfirmDialog = () => {
  const isTurningOn = localValue.value === inactiveValue.value

  const confirmConfig = props.info.confirm
  const title = confirmConfig.title || '确认操作'
  const message = isTurningOn
    ? confirmConfig.messageOn || `确定要${activeText.value}吗？`
    : confirmConfig.messageOff || `确定要${inactiveText.value}吗？`
  const confirmButtonText = confirmConfig.confirmButtonText || '确定'
  const cancelButtonText = confirmConfig.cancelButtonText || '取消'
  const type = confirmConfig.type || 'warning'

  return ElMessageBox.confirm(message, title, {
    confirmButtonText,
    cancelButtonText,
    type,
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true

        // 如果有异步确认逻辑
        if (typeof confirmConfig.onConfirm === 'function') {
          confirmConfig
            .onConfirm(isTurningOn)
            .then(() => {
              instance.confirmButtonLoading = false
              done()
            })
            .catch((error) => {
              instance.confirmButtonLoading = false
              ElMessage.error(error.message || '操作失败')
              done(false)
            })
        } else {
          instance.confirmButtonLoading = false
          done()
        }
      } else {
        done()
      }
    },
  })
    .then(() => {
      return true
    })
    .catch(() => {
      // 取消操作，恢复原值
      localValue.value = lastValue.value
      return false
    })
}

// 处理确认弹窗
const handleConfirm = (newValue) => {
  const isTurningOn = newValue === activeValue.value

  // 确认后的回调
  if (props.info.confirm && props.info.confirm.afterConfirm) {
    setTimeout(() => {
      props.info.confirm.afterConfirm(isTurningOn, newValue)
    }, 100)
  }
}

// 监听 info 变化
watch(
  () => props.info,
  (newInfo) => {
    // 如果 activeValue 或 inactiveValue 发生变化，需要调整当前值
    if (
      newInfo.activeValue !== undefined ||
      newInfo.inactiveValue !== undefined
    ) {
      // 如果当前值等于旧的 activeValue，更新为新的 activeValue
      if (localValue.value === props.info.activeValue) {
        localValue.value = newInfo.activeValue
      }
      // 如果当前值等于旧的 inactiveValue，更新为新的 inactiveValue
      else if (localValue.value === props.info.inactiveValue) {
        localValue.value = newInfo.inactiveValue
      }
    }
  },
  { deep: true },
)

// 暴露方法
defineExpose({
  toggle: () => {
    const newValue =
      localValue.value === activeValue.value
        ? inactiveValue.value
        : activeValue.value
    localValue.value = newValue
  },
  turnOn: () => {
    localValue.value = activeValue.value
  },
  turnOff: () => {
    localValue.value = inactiveValue.value
  },
  getValue: () => localValue.value,
})
</script>

<style scoped></style>
