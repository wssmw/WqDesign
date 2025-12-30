<template>
  <el-form-item
    :label="info.label"
    :prop="info.key"
    :rules="info.rules"
    :required="info.required"
  >
    <el-input
      v-model="localValue"
      :type="computedType"
      :placeholder="info.placeholder"
      :disabled="info.disabled || operateType === 'view'"
      :clearable="info.clearable !== false && operateType !== 'view'"
      :show-password="info.type === 'password'"
      :rows="info.rows || 4"
      :readonly="operateType === 'view'"
      @keyup.enter="$emit('on-enter', localValue)"
      @clear="$emit('on-clear')"
    >
      <!-- 插槽支持 -->
      <template v-if="info.prepend && !$slots.prepend" #prepend>
        {{ info.prepend }}
      </template>
      <template v-if="$slots.prepend" #prepend>
        <slot name="prepend" />
      </template>

      <template v-if="info.append && !$slots.append" #append>
        {{ info.append }}
      </template>
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </el-input>
  </el-form-item>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  operateType: {
    type: String,
    default: 'edit',
  },
})

const emit = defineEmits(['update:modelValue', 'on-enter', 'on-clear'])

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const computedType = computed(() => {
  const typeMap = {
    input: 'text',
    text: 'text',
    password: 'password',
    textarea: 'textarea',
  }
  return typeMap[props.info.type] || 'text'
})
</script>
