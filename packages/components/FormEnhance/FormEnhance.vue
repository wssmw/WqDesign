<template>
  <div style="position: relative">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :size="size"
      class="customed-edit-form"
      :class="{
        search: operateType === 'search',
        view: operateType === 'view',
      }"
    >
      <!-- 顶部提交按钮 -->
      <div v-if="submitShow && submitPosition === 'top'" class="submit-top">
        <el-button v-if="resetShow" :size="size" @click.prevent="resetForm">{{
          resetText
        }}</el-button>
        <el-button :size="size" @click.prevent="submitForm">
          {{ submitText }}
        </el-button>
      </div>

      <!-- 动态表单项 -->
      <el-row :gutter="20">
        <template
          v-for="(info, index) in visibleInfos"
          :key="info.key || index"
        >
          <el-col :span="getColSpan(info)">
            <!-- 如果有插槽，直接渲染插槽内容 -->
            <template v-if="$slots[info.key]">
              <slot
                :name="info.key"
                v-bind="{
                  info,
                  modelValue: formModel[info.key],
                  model: formModel,
                }"
              />
            </template>
            <!-- 否则渲染默认组件 -->
            <component
              v-else
              :is="getComponentType(info)"
              :info="info"
              v-model="formModel[info.key]"
              :model="formModel"
              :operate-type="operateType"
              @on-enter="$emit('on-enter', formModel)"
              @on-clear="$emit('on-clear', formModel)"
              @update:loading="loading = $event"
            >
              <!-- 动态传递所有以 字段名- 开头的插槽到子组件 -->
              <template
                v-for="slotConfig in getChildSlotConfigs(info.key)"
                :key="slotConfig.fullName"
                v-slot:[slotConfig.childName]="slotProps"
              >
                <slot :name="slotConfig.fullName" v-bind="slotProps" />
              </template>
            </component>
          </el-col>
        </template>
      </el-row>

      <!-- 底部提交按钮 -->
      <div
        v-if="submitShow && submitPosition === 'bottom'"
        class="submit-bottom"
      >
        <el-button v-if="resetShow" :size="size" @click.prevent="resetForm">
          {{ resetText }}
        </el-button>
        <el-button
          :size="size"
          @click.prevent="submitForm"
          :long="submitLong"
          :round="submitShape"
          type="primary"
        >
          {{ submitText }}
        </el-button>
      </div>
    </el-form>

    <!-- 加载状态 -->
    <!-- <el-spin v-if="loading" :fullscreen="true" /> -->
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, useSlots } from 'vue'
import formComponents from './register'
const slots = useSlots()
// 定义 Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  operateType: {
    type: String,
    default: 'edit',
    validator: (value) => ['edit', 'view', 'search'].includes(value),
  },
  formConfig: {
    type: Array,
    default: () => [],
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: {
    type: [String, Number],
    default: '100px',
  },
  labelPosition: {
    type: String,
    default: 'right',
  },
  size: {
    type: String,
    default: 'default',
  },
  submitVoid: {
    type: Boolean,
    default: true,
  },
  submitShow: {
    type: Boolean,
    default: true,
  },
  submitPosition: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom'].includes(value),
  },
  submitText: {
    type: String,
    default: '提交',
  },
  submitLong: {
    type: Boolean,
    default: false,
  },
  submitShape: {
    type: Boolean,
    default: false,
  },
  resetShow: {
    type: Boolean,
    default: true,
  },
  resetText: {
    type: String,
    default: '重置',
  },
})

// 定义 Emits
const emit = defineEmits([
  'submit',
  'on-enter',
  'on-clear',
  'update:modelValue',
  'change',
])

// 响应式数据
const formRef = ref(null)
const loading = ref(false)
const formModel = ref({})

// 计算属性：可见的表单项
const visibleInfos = computed(() => {
  return props.formConfig.filter((info) => {
    if (info.linking) {
      return doLinking(info, formModel.value)
    }
    return true
  })
})

// 初始化表单数据
const initFormModel = (ignoreExternalValue = false) => {
  const model = {}
  props.formConfig.forEach((item) => {
    if (item.type !== 'hr') {
      // 如果 ignoreExternalValue 为 true（重置时），忽略外部传入的 modelValue
      // 否则优先使用外部传入的 modelValue，其次使用配置中的 value，最后使用默认值
      model[item.key] = ignoreExternalValue
        ? (item.value ?? (item.type === 'checkbox' ? [] : ''))
        : (props.modelValue[item.key] ??
          item.value ??
          (item.type === 'checkbox' ? [] : ''))
    }
  })
  formModel.value = model
  // 同步到外部
  emit('update:modelValue', { ...formModel.value })
}

// 获取组件类型
const getComponentType = (info) => {
  const type = info.type || 'input'
  return formComponents[type] || formComponents['input']
}

// 获取列跨度
const getColSpan = (info) => {
  if (info.colSpan) return info.colSpan
  if (info.type === 'hr') return 24
  return 24
}

// 判断是否是子组件的插槽（以 字段名- 开头）
const isChildSlot = (key, slotName) => {
  return slotName.startsWith(`${key}-`)
}
// 获取所有以 字段名- 开头的插槽配置列表
const getChildSlotConfigs = (key) => {
  if (!slots) return []
  return Object.keys(slots)
    .filter((slotName) => isChildSlot(key, slotName))
    .map((slotName) => ({
      fullName: slotName, // 完整的插槽名，如 username-prepend
      childName: slotName.replace(`${key}-`, ''), // 子组件的插槽名，如 prepend
    }))
}

// 表单提交
const submitForm = async () => {
  if (!formRef.value) return

  try {
    const isValid = await formRef.value.validate()
    if (isValid) {
      let param = processFormData()
      emit('submit', param)
      return param
    }
  } catch (error) {
    console.error('表单验证失败:', error)
    emit('submit', false)
    return false
  }
}

// 处理表单数据
const processFormData = () => {
  // 浅拷贝表单数据
  let param = { ...formModel.value }

  // 移除不可见表单项
  props.formConfig.forEach((info) => {
    if (info.linking && !doLinking(info, formModel.value)) {
      delete param[info.key]
    }
  })

  // 处理日期范围字段
  Object.keys(param).forEach((key) => {
    if (key.includes(',') && Array.isArray(param[key])) {
      const [startKey, endKey] = key.split(',')
      param[startKey] = param[key][0]
      param[endKey] = param[key][1]
      delete param[key]
    }
  })

  // 处理空值（如果配置了不提交空值）
  if (!props.submitVoid) {
    Object.keys(param).forEach((key) => {
      if (param[key] === '' || param[key] == null) {
        delete param[key]
      }
    })
  }

  return param
}

// 表单重置
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
    // 重置时忽略外部传入的 modelValue，使用配置中的初始值或默认值
    initFormModel(true)
  }
}

// 联动处理
const doLinking = (info, model) => {
  const { linking } = info
  if (!linking) return true

  const { key, value, linkingType } = linking
  const targetValue = model[key]

  if (linkingType === 'hidden' || linkingType === 'show') {
    let shouldShow = true

    if (Array.isArray(value)) {
      shouldShow = Array.isArray(targetValue)
        ? targetValue.some((v) => value.includes(v))
        : value.includes(targetValue)
    } else {
      shouldShow = Array.isArray(targetValue)
        ? targetValue.includes(value)
        : targetValue === value
    }

    return linkingType === 'show' ? shouldShow : !shouldShow
  }

  // 禁用状态处理
  if (
    props.operateType !== 'view' &&
    (linkingType === 'disabled' || linkingType === 'undisabled')
  ) {
    let shouldDisable = false

    if (Array.isArray(value)) {
      shouldDisable = Array.isArray(targetValue)
        ? targetValue.some((v) => value.includes(v))
        : value.includes(targetValue)
    } else {
      shouldDisable = Array.isArray(targetValue)
        ? targetValue.includes(value)
        : targetValue === value
    }

    info.disabled = linkingType === 'disabled' ? shouldDisable : !shouldDisable
  } else {
    info.disabled = false
  }

  return true
}

// 监听 formConfig 变化重新初始化
watch(
  () => props.formConfig,
  () => {
    nextTick(() => {
      initFormModel()
    })
  },
  { deep: true, immediate: true },
)

// 监听外部 modelValue 变化，同步到内部 formModel
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      Object.keys(newVal).forEach((key) => {
        if (key in formModel.value) {
          formModel.value[key] = newVal[key]
        }
      })
    }
  },
  { deep: true },
)

// 监听 formModel 变化，同步到外部
watch(
  formModel,
  (newVal) => {
    emit('update:modelValue', { ...newVal })
    emit('change', newVal)
  },
  { deep: true },
)

// 暴露方法给父组件
defineExpose({
  submitForm,
  resetForm,
  validate: () => formRef.value?.validate(),
  clearValidate: () => formRef.value?.clearValidate(),
})
</script>

<style scoped lang="less">
.submit-top,
.submit-bottom {
  text-align: center;
  padding: 0 10px 20px;
}
</style>
