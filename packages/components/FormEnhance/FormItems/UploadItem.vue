<template>
  <el-form-item
    :label="info.label"
    :prop="info.key"
    :rules="computedRules"
    :required="info.required"
  >
    <!-- 上传组件 -->
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :action="uploadAction"
      :headers="uploadHeaders"
      :multiple="info.multiple !== false"
      :accept="info.accept"
      :limit="info.limit"
      :list-type="listType"
      :auto-upload="autoUpload"
      :disabled="isDisabled"
      :show-file-list="info.showFileList !== false"
      :drag="info.drag"
      :before-upload="handleBeforeUpload"
      :before-remove="handleBeforeRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-exceed="handleExceed"
      :http-request="httpRequest"
    >
      <!-- 上传按钮区域 -->
      <template v-if="info.listType === 'picture-card'">
        <!-- 卡片样式 -->
        <el-icon v-if="!isDisabled"><Plus /></el-icon>
        <div v-else class="upload-disabled">已禁用</div>
      </template>
      <template v-else-if="info.drag">
        <!-- 拖拽样式 -->
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template v-if="info.tip">
          <div class="el-upload__tip">
            {{ info.tip }}
          </div>
        </template>
      </template>
      <template v-else>
        <!-- 按钮样式 -->
        <el-button :type="info.buttonType || 'primary'" :disabled="isDisabled">
          <el-icon><upload /></el-icon>
          {{ info.buttonText || '选择文件' }}
        </el-button>
        <div v-if="info.tip" class="upload-tip">
          {{ info.tip }}
        </div>
      </template>

      <!-- 文件列表插槽 -->
      <template v-if="$slots.file" #file="{ file }">
        <slot name="file" :file="file" />
      </template>

      <!-- 触发区域插槽 -->
      <template v-if="$slots.trigger">
        <slot name="trigger" />
      </template>

      <!-- 提示插槽 -->
      <template v-if="$slots.tip">
        <slot name="tip" />
      </template>
    </el-upload>

    <!-- 已上传文件列表 -->
    <div v-if="info.showPreview && fileList.length > 0" class="file-preview">
      <div v-for="file in fileList" :key="file.uid" class="file-item">
        <div class="file-info">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatFileSize(file.size) }}</span>
          <el-button
            v-if="!isDisabled"
            type="text"
            size="small"
            @click="handleRemoveFile(file)"
          >
            删除
          </el-button>
        </div>
        <el-progress
          v-if="file.status === 'uploading'"
          :percentage="file.percentage"
          :stroke-width="2"
          style="width: 200px"
        />
      </div>
    </div>

    <!-- 描述文本 -->
    <div v-if="info.description" class="upload-description">
      {{ info.description }}
    </div>
  </el-form-item>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, UploadFilled, Upload } from '@element-plus/icons-vue'

const props = defineProps({
  info: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  modelValue: {
    type: [String, Array, Object],
    default: () => [],
  },
  operateType: {
    type: String,
    default: 'edit',
  },
})

const emit = defineEmits([
  'update:modelValue',
  'update:loading',
  'success',
  'error',
  'change',
  'remove',
])

const uploadRef = ref(null)
const fileList = ref([])
const isLoading = ref(false)

// 初始化文件列表
const initFileList = () => {
  if (!props.modelValue) {
    fileList.value = []
    return
  }

  if (Array.isArray(props.modelValue)) {
    fileList.value = props.modelValue.map((item) => {
      if (typeof item === 'string') {
        return {
          name: item.split('/').pop(),
          url: item,
          status: 'success',
        }
      }
      return { ...item, status: 'success' }
    })
  } else if (typeof props.modelValue === 'string') {
    fileList.value = [
      {
        name: props.modelValue.split('/').pop(),
        url: props.modelValue,
        status: 'success',
      },
    ]
  }
}

const isDisabled = computed(() => {
  return props.info.disabled || props.operateType === 'view'
})

const listType = computed(() => {
  return props.info.listType || 'text'
})

const autoUpload = computed(() => {
  return props.info.autoUpload !== false
})

const uploadAction = computed(() => {
  return props.info.action || '/api/upload'
})

const uploadHeaders = computed(() => {
  return {
    ...props.info.headers,
    Authorization: props.info.token ? `Bearer ${props.info.token}` : undefined,
  }
})

const computedRules = computed(() => {
  const rules = [...(props.info.rules || [])]

  if (props.info.required && !rules.some((rule) => rule.required)) {
    rules.push({
      required: true,
      message: `请上传${props.info.label}`,
      trigger: 'blur',
      validator: (rule, value) => {
        if (props.info.multiple === false) {
          return !!value
        }
        return Array.isArray(value) && value.length > 0
      },
    })
  }

  // 文件大小限制
  if (props.info.maxSize) {
    rules.push({
      validator: (rule, value, callback) => {
        if (!value) return callback()

        const files = Array.isArray(value) ? value : [value]
        const oversized = files.some((file) => file.size > props.info.maxSize)

        if (oversized) {
          return callback(
            new Error(`文件大小不能超过${formatFileSize(props.info.maxSize)}`),
          )
        }
        callback()
      },
      trigger: 'change',
    })
  }

  // 文件类型限制
  if (props.info.accept) {
    rules.push({
      validator: (rule, value, callback) => {
        if (!value) return callback()

        const files = Array.isArray(value) ? value : [value]
        const acceptTypes = props.info.accept
          .split(',')
          .map((type) => type.trim())

        const invalid = files.some((file) => {
          const fileType = file.type || file.raw?.type
          const fileName = file.name || file.raw?.name
          const fileExt = fileName?.split('.').pop().toLowerCase()

          return !acceptTypes.some((acceptType) => {
            if (acceptType.startsWith('.')) {
              return `.${fileExt}` === acceptType
            }
            return fileType?.startsWith(acceptType.replace('/*', ''))
          })
        })

        if (invalid) {
          return callback(new Error(`只支持${props.info.accept}格式的文件`))
        }
        callback()
      },
      trigger: 'change',
    })
  }

  return rules
})

// 文件大小格式化
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 上传前处理
const handleBeforeUpload = (file) => {
  emit('update:loading', true)
  isLoading.value = true

  // 自定义验证
  if (typeof props.info.beforeUpload === 'function') {
    return props.info.beforeUpload(file)
  }

  // 大小验证
  if (props.info.maxSize && file.size > props.info.maxSize) {
    ElMessage.error(`文件大小不能超过${formatFileSize(props.info.maxSize)}`)
    isLoading.value = false
    emit('update:loading', false)
    return false
  }

  // 类型验证
  if (props.info.accept) {
    const acceptTypes = props.info.accept.split(',').map((type) => type.trim())
    const fileExt = file.name.split('.').pop().toLowerCase()
    const fileType = file.type

    const isValid = acceptTypes.some((acceptType) => {
      if (acceptType.startsWith('.')) {
        return `.${fileExt}` === acceptType
      }
      if (acceptType.includes('/')) {
        return fileType === acceptType
      }
      if (acceptType.endsWith('/*')) {
        const mainType = acceptType.replace('/*', '')
        return fileType.startsWith(mainType)
      }
      return false
    })

    if (!isValid) {
      ElMessage.error(`只支持${props.info.accept}格式的文件`)
      isLoading.value = false
      emit('update:loading', false)
      return false
    }
  }

  return true
}

// 上传成功
const handleSuccess = (response, file, fileList) => {
  isLoading.value = false
  emit('update:loading', false)

  // 获取文件URL
  const getUrl = props.info.getUrl || ((res) => res.data?.url || res.url)
  const url = getUrl(response)

  // 更新文件状态
  file.url = url

  // 更新模型值
  updateModelValue()

  emit('success', { response, file, fileList })

  if (props.info.onSuccess) {
    props.info.onSuccess(response, file, fileList)
  }

  ElMessage.success('上传成功')
}

// 上传失败
const handleError = (error, file, fileList) => {
  isLoading.value = false
  emit('update:loading', false)

  file.status = 'fail'

  emit('error', { error, file, fileList })

  if (props.info.onError) {
    props.info.onError(error, file, fileList)
  }

  ElMessage.error('上传失败：' + (error.message || '未知错误'))
}

// 上传进度
const handleProgress = (event, file, fileList) => {
  emit('update:loading', true)

  if (props.info.onProgress) {
    props.info.onProgress(event, file, fileList)
  }
}

// 文件变化
const handleChange = (file, fileList) => {
  emit('change', { file, fileList })

  if (props.info.onChange) {
    props.info.onChange(file, fileList)
  }
}

// 移除文件前
const handleBeforeRemove = (file, fileList) => {
  if (typeof props.info.beforeRemove === 'function') {
    return props.info.beforeRemove(file, fileList)
  }

  return ElMessageBox.confirm(`确定删除 ${file.name} 吗？`, '提示', {
    type: 'warning',
  })
    .then(() => true)
    .catch(() => false)
}

// 移除文件
const handleRemove = (file, fileList) => {
  updateModelValue()
  emit('remove', { file, fileList })
}

// 预览文件
const handlePreview = (file) => {
  if (file.url) {
    window.open(file.url, '_blank')
  } else if (file.raw) {
    // 本地文件预览
    const url = URL.createObjectURL(file.raw)
    window.open(url, '_blank')
  }
}

// 超出限制
const handleExceed = (files, fileList) => {
  ElMessage.warning(`最多上传 ${props.info.limit} 个文件`)

  if (props.info.onExceed) {
    props.info.onExceed(files, fileList)
  }
}

// 自定义上传
const httpRequest = (options) => {
  if (typeof props.info.httpRequest === 'function') {
    return props.info.httpRequest(options)
  }
  return options
}

// 更新模型值
const updateModelValue = () => {
  const files = fileList.value
    .filter((file) => file.status === 'success')
    .map((file) => file.url || file.response?.url || file)

  if (props.info.multiple === false) {
    emit('update:modelValue', files[0] || '')
  } else {
    emit('update:modelValue', files)
  }
}

// 手动移除文件
const handleRemoveFile = (file) => {
  const index = fileList.value.findIndex((f) => f.uid === file.uid)
  if (index > -1) {
    fileList.value.splice(index, 1)
    updateModelValue()
  }
}

// 手动上传
const submitUpload = () => {
  if (uploadRef.value) {
    uploadRef.value.submit()
  }
}

// 清空文件
const clearFiles = () => {
  if (uploadRef.value) {
    uploadRef.value.clearFiles()
    fileList.value = []
    updateModelValue()
  }
}

// 暴露方法
defineExpose({
  submitUpload,
  clearFiles,
  fileList,
})

// 初始化
initFileList()

// 监听模型值变化
watch(
  () => props.modelValue,
  () => {
    initFileList()
  },
  { deep: true },
)

// 监听文件列表变化
watch(
  fileList,
  () => {
    updateModelValue()
  },
  { deep: true },
)
</script>

<style scoped>
.file-preview {
  margin-top: 12px;
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background: #fafafa;
}

.file-item {
  padding: 8px 0;
  border-bottom: 1px solid #e4e7ed;
}

.file-item:last-child {
  border-bottom: none;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  color: #999;
  font-size: 12px;
}

.upload-tip {
  margin-top: 8px;
  color: #909399;
  font-size: 12px;
}

.upload-description {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

.upload-disabled {
  color: #c0c4cc;
  font-size: 14px;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-list) {
  margin-top: 8px;
}

:deep(.el-upload--picture-card) {
  width: 148px;
  height: 148px;
}

:deep(.el-upload-dragger) {
  width: 100%;
  max-width: 400px;
}
</style>
