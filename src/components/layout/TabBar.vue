<script setup lang="ts">
import type { MenuItem } from '../../types/menu'

defineProps<{
  tabs: MenuItem[]
  activeTab: string
}>()

const emit = defineEmits<{
  (e: 'change-tab', key: string): void
  (e: 'close-tab', key: string): void
}>()
</script>

<template>
  <div class="tab-bar">
    <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="emit('change-tab', tab.key)"
    >
      <span>{{ tab.title }}</span>
      <button class="close-btn" @click.stop="emit('close-tab', tab.key)">×</button>
    </div>

    <div v-if="tabs.length === 0" class="empty-text">
      请先从左侧菜单选择功能
    </div>
  </div>
</template>

<style scoped src="@/assets/styles/components/tab-bar.css"></style>