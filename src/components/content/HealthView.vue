<script setup lang="ts">
import { ref, watch } from 'vue'
import { getPageCache, setPageCache } from '../../stores/pageCache'
import type { HealthPageCache, MenuItem } from '../../types/menu'

const props = defineProps<{
  tab: MenuItem
}>()

const loading = ref<boolean>(false)
const errorMsg = ref<string>('')
const healthData = ref<unknown>(null)
const lastUpdateTime = ref<string>('')

const restoreCache = (cache: HealthPageCache): void => {
  healthData.value = cache.healthData
  lastUpdateTime.value = cache.lastUpdateTime || ''
}

const saveCache = (): void => {
  setPageCache(props.tab.key, {
    view: 'health',
    loaded: true,
    healthData: healthData.value,
    lastUpdateTime: lastUpdateTime.value,
    updatedAt: Date.now()
  })
}

const loadHealth = async (): Promise<void> => {
  if (!props.tab.api) return

  loading.value = true
  errorMsg.value = ''

  try {
    const response = await fetch(props.tab.api, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`请求失败：${response.status}`)
    }

    const result = await response.json()
    console.log('健康检查返回:', result)

    healthData.value = result
    lastUpdateTime.value = new Date().toLocaleString()

    saveCache()
  } catch (error) {
    healthData.value = null
    errorMsg.value =
        error instanceof Error ? error.message : '健康检查失败'
  } finally {
    loading.value = false
  }
}

const handleRefresh = async (): Promise<void> => {
  await loadHealth()
}

watch(
    () => props.tab.key,
    async (newKey: string) => {
      const cache = getPageCache(newKey)

      if (cache && cache.view === 'health') {
        restoreCache(cache as HealthPageCache)
        return
      }

      healthData.value = null
      lastUpdateTime.value = ''
      await loadHealth()
    },
    { immediate: true }
)
</script>

<template>
  <div class="health-view">
    <div class="health-toolbar">
      <div class="left-area">
        <h3 class="health-title">{{ tab.title }}</h3>
        <span class="health-url">接口：{{ tab.api }}</span>
      </div>

      <div class="right-area">
        <button class="action-btn" @click="handleRefresh">刷新</button>
      </div>
    </div>

    <div class="meta-info">
      <span>最近更新时间：{{ lastUpdateTime || '--' }}</span>
    </div>

    <div v-if="loading" class="state-box">健康检查中...</div>

    <div v-else-if="errorMsg" class="state-box error-box">
      {{ errorMsg }}
    </div>

    <div v-else class="result-box">
      <div class="status-line">
        <span class="label">状态：</span>
        <span class="status success">可访问</span>
      </div>

      <pre class="json-box">{{ JSON.stringify(healthData, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.health-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
}

.health-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.left-area {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.health-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.health-url {
  font-size: 14px;
  color: #606266;
  word-break: break-all;
}

.meta-info {
  padding: 10px 12px;
  background: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  color: #606266;
  font-size: 14px;
}

.action-btn {
  padding: 8px 14px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.action-btn:hover {
  background: #f5f7fa;
}

.state-box {
  flex: 1;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
}

.error-box {
  color: #f56c6c;
}

.result-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
}

.status-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-weight: 600;
}

.status.success {
  color: #67c23a;
  font-weight: 700;
}

.json-box {
  margin: 0;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 6px;
  white-space: pre-wrap;
  word-break: break-word;
  overflow: auto;
}
</style>