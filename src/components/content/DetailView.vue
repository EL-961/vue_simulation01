<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getPageCache, setPageCache } from '../../stores/pageCache'
import type {
  DetailPageCache,
  GenericRow,
  MenuItem
} from '../../types/menu'

const props = defineProps<{
  tab: MenuItem
}>()

const loading = ref<boolean>(false)
const errorMsg = ref<string>('')
const detailData = ref<GenericRow | null>(null)
const queryId = ref<string>('')

const requestUrl = computed<string>(() => {
  const params = new URLSearchParams()

  if (props.tab.tbl) {
    params.set('tbl', props.tab.tbl)
  }

  if (queryId.value.trim()) {
    params.set('id', queryId.value.trim())
  }

  return `${props.tab.api}?${params.toString()}`
})

const restoreCache = (cache: DetailPageCache<GenericRow>): void => {
  queryId.value = cache.queryId
  detailData.value = cache.detailData
}

const saveCache = (): void => {
  setPageCache(props.tab.key, {
    view: 'detail',
    loaded: true,
    queryId: queryId.value,
    detailData: detailData.value,
    updatedAt: Date.now()
  })
}

const loadDetail = async (): Promise<void> => {
  if (!props.tab.api) return

  if (!queryId.value.trim()) {
    errorMsg.value = '请输入 ID'
    detailData.value = null
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    const response = await fetch(requestUrl.value, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`请求失败：${response.status}`)
    }

    const result = await response.json()
    console.log('单条详情返回:', result)

    const data =
        result?.result ||
        result?.data ||
        result ||
        null

    if (Array.isArray(data)) {
      detailData.value = (data[0] as GenericRow) || null
    } else if (data && typeof data === 'object') {
      detailData.value = data as GenericRow
    } else {
      detailData.value = null
    }

    saveCache()
  } catch (error) {
    detailData.value = null
    errorMsg.value =
        error instanceof Error ? error.message : '详情加载失败'
  } finally {
    loading.value = false
  }
}

const handleSearch = async (): Promise<void> => {
  await loadDetail()
}

const handleReset = (): void => {
  queryId.value = ''
  detailData.value = null
  errorMsg.value = ''
}

watch(
    () => props.tab.key,
    async (newKey: string) => {
      const cache = getPageCache(newKey)

      if (cache && cache.view === 'detail') {
        restoreCache(cache as DetailPageCache<GenericRow>)
        return
      }

      queryId.value = ''
      detailData.value = null
      errorMsg.value = ''
    },
    { immediate: true }
)
</script>

<template>
  <div class="detail-view">
    <div class="page-header">
      <div class="header-left">
        <h3>{{ tab.title }}</h3>
        <span>表名：{{ tab.tbl || '--' }}</span>
      </div>
    </div>

    <div class="search-bar">
      <label class="input-label">ID：</label>
      <input
          v-model="queryId"
          class="id-input"
          type="text"
          placeholder="请输入要查询的 ID"
          @keyup.enter="handleSearch"
      />
      <button class="action-btn" @click="handleSearch">查询</button>
      <button class="action-btn" @click="handleReset">重置</button>
    </div>

    <div class="request-url">
      <span class="label">请求地址：</span>
      <span class="value">{{ requestUrl }}</span>
    </div>

    <div v-if="loading" class="state-box">加载中...</div>

    <div v-else-if="errorMsg" class="state-box error-box">
      {{ errorMsg }}
    </div>

    <div v-else-if="detailData" class="detail-wrapper">
      <table class="detail-table">
        <tbody>
        <tr v-for="key in Object.keys(detailData)" :key="key">
          <th>{{ key }}</th>
          <td>{{ detailData[key] ?? '--' }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="state-box">
      请输入 ID 并点击查询
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.header-left h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.header-left span {
  font-size: 14px;
  color: #606266;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 12px;
  background: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 8px;
}

.input-label {
  font-weight: 600;
}

.id-input {
  width: 320px;
  max-width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  outline: none;
}

.id-input:focus {
  border-color: #409eff;
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

.request-url {
  padding: 10px 12px;
  background: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  font-size: 13px;
  word-break: break-all;
}

.request-url .label {
  font-weight: 600;
  margin-right: 6px;
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

.detail-wrapper {
  flex: 1;
  overflow: auto;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
}

.detail-table th,
.detail-table td {
  padding: 12px;
  border-bottom: 1px solid #ebeef5;
  text-align: left;
  vertical-align: top;
}

.detail-table th {
  width: 220px;
  background: #f5f7fa;
  font-weight: 600;
  white-space: nowrap;
}

.detail-table td {
  word-break: break-word;
}
</style>