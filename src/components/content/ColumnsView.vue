<script setup lang="ts">
import { ref, watch } from 'vue'
import { getPageCache, setPageCache } from '../../stores/pageCache'
import type {
  ColumnsPageCache,
  GenericRow,
  MenuItem
} from '../../types/menu'

const props = defineProps<{
  tab: MenuItem
}>()

const loading = ref<boolean>(false)
const errorMsg = ref<string>('')
const columnsData = ref<GenericRow[]>([])

const buildUrl = (): string => {
  const params = new URLSearchParams()

  if (props.tab.tbl) {
    params.set('tbl', props.tab.tbl)
  }

  return `${props.tab.api}?${params.toString()}`
}

const restoreCache = (cache: ColumnsPageCache<GenericRow>): void => {
  columnsData.value = [...cache.rows]
}

const saveCache = (): void => {
  setPageCache(props.tab.key, {
    view: 'columns',
    loaded: true,
    rows: [...columnsData.value],
    updatedAt: Date.now()
  })
}

const loadColumns = async (): Promise<void> => {
  if (!props.tab.api) return

  loading.value = true
  errorMsg.value = ''

  try {
    const response = await fetch(buildUrl(), {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`请求失败：${response.status}`)
    }

    const result = await response.json()
    console.log('字段查看返回:', result)

    const data =
        result?.result ||
        result?.data ||
        result ||
        []

    if (Array.isArray(data)) {
      columnsData.value = data
    } else if (Array.isArray(data?.records)) {
      columnsData.value = data.records
    } else {
      columnsData.value = []
    }

    saveCache()
  } catch (error) {
    columnsData.value = []
    errorMsg.value =
        error instanceof Error ? error.message : '字段加载失败'
  } finally {
    loading.value = false
  }
}

const handleRefresh = async (): Promise<void> => {
  await loadColumns()
}

watch(
    () => props.tab.key,
    async (newKey: string) => {
      const cache = getPageCache(newKey)

      if (cache && cache.view === 'columns') {
        restoreCache(cache as ColumnsPageCache<GenericRow>)
        return
      }

      columnsData.value = []
      await loadColumns()
    },
    { immediate: true }
)
</script>

<template>
  <div class="columns-view">
    <div class="page-header">
      <div class="header-left">
        <h3>{{ tab.title }}</h3>
        <span>表名：{{ tab.tbl || '--' }}</span>
      </div>

      <div class="header-right">
        <button class="action-btn" @click="handleRefresh">刷新</button>
      </div>
    </div>

    <div v-if="loading" class="state-box">加载中...</div>

    <div v-else-if="errorMsg" class="state-box error-box">
      {{ errorMsg }}
    </div>

    <div v-else class="table-wrapper">
      <table class="data-table">
        <thead>
        <tr v-if="columnsData.length > 0">
          <th v-for="key in Object.keys(columnsData[0])" :key="key">
            {{ key }}
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-if="columnsData.length === 0">
          <td class="empty-cell">暂无字段数据</td>
        </tr>

        <tr v-for="(row, index) in columnsData" :key="index">
          <td v-for="key in Object.keys(row)" :key="key">
            {{ row[key] ?? '--' }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.columns-view {
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
  gap: 12px;
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

.table-wrapper {
  flex: 1;
  overflow: auto;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
}

.data-table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  border-bottom: 1px solid #ebeef5;
  text-align: left;
  white-space: nowrap;
}

.data-table thead th {
  background: #f5f7fa;
  font-weight: 600;
}

.empty-cell {
  text-align: center;
  color: #909399;
}
</style>