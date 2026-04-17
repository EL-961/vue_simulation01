<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from '@/types/menu'

defineProps<{
  tabs: MenuItem[]
  activeTab: string
}>()

const emit = defineEmits<{
  (e: 'change-tab', key: string): void
  (e: 'close-tab', key: string): void
}>()

const tabBarRef = ref<HTMLElement | null>(null)

const handleWheel = (event: WheelEvent): void => {
  const el = tabBarRef.value
  if (!el) return
  if (event.deltaY === 0) return

  event.preventDefault()
  el.scrollBy({
    left: event.deltaY,
    behavior: 'auto'
  })
}
</script>

<template>
  <div
      ref="tabBarRef"
      class="tab-bar"
      :class="{ 'tab-bar--even': tabs.length > 0 && tabs.length <= 6 }"
      @wheel.prevent="handleWheel"
  >
    <div
        v-for="(tab, index) in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{
        active: activeTab === tab.key,
        first: index === 0
      }"
        @click="emit('change-tab', tab.key)"
    >
      <span class="tab-title">{{ tab.title }}</span>

      <button
          v-if="activeTab === tab.key"
          type="button"
          class="close-btn"
          @click.stop="emit('close-tab', tab.key)"
      >
        ×
      </button>
    </div>

    <div v-if="tabs.length === 0" class="empty-text">
      请先从左侧菜单选择功能
    </div>
  </div>
</template>