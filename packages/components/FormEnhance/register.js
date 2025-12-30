// register.js - 优化版本
import { defineAsyncComponent } from 'vue'

// 只注册基础类型，在组件内部处理变体
export default {
  // 基础组件类型
  input: defineAsyncComponent(() => import('./FormItems/InputItem.vue')),
  textarea: defineAsyncComponent(() => import('./FormItems/InputItem.vue')),
  password: defineAsyncComponent(() => import('./FormItems/InputItem.vue')),
  // 时间类型
  date: defineAsyncComponent(() => import('./FormItems/DateItem.vue')),
  daterange: defineAsyncComponent(() => import('./FormItems/DateItem.vue')),
  datetime: defineAsyncComponent(() => import('./FormItems/DateItem.vue')),
  datetimerange: defineAsyncComponent(() => import('./FormItems/DateItem.vue')),
  year: defineAsyncComponent(() => import('./FormItems/DateItem.vue')),
  month: defineAsyncComponent(() => import('./FormItems/DateItem.vue')),
  dates: defineAsyncComponent(() => import('./FormItems/DateItem.vue')),
  week: defineAsyncComponent(() => import('./FormItems/DateItem.vue')),

  select: defineAsyncComponent(() => import('./FormItems/SelectItem.vue')),
  switch: defineAsyncComponent(() => import('./FormItems/SwitchItem.vue')),
  radio: defineAsyncComponent(() => import('./FormItems/RadioItem.vue')),
  checkbox: defineAsyncComponent(() => import('./FormItems/CheckboxItem.vue')),

  upload: defineAsyncComponent(() => import('./FormItems/UploadItem.vue')),
  // 特殊组件
  hr: {
    render() {
      return h('el-divider')
    },
  },

  slot: {
    props: ['info'],
    setup(props, { slots }) {
      return () => slots.default?.({ info: props.info }) || null
    },
  },
}
