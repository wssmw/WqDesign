<template>
  <el-form-item
    :label="info.label"
    :prop="info.key"
    :rules="info.rules"
    :required="info.required"
  >
    <el-select
      v-model="localValue"
      :placeholder="info.placeholder"
      :disabled="info.disabled || operateType === 'view'"
      :clearable="info.clearable !== false && operateType !== 'view'"
      :multiple="info.multiple"
      :filterable="info.filterable"
      :readonly="operateType === 'view'"
    >
      <el-option
        v-for="option in info.options || []"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
      />
      <template v-if="$slots.default">
        <slot :options="info.options" />
      </template>
    </el-select>
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
    type: [String, Number, Array],
    default: '',
  },
  operateType: {
    type: String,
    default: 'edit',
  },
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
