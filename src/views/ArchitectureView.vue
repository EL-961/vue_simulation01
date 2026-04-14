<script setup lang="ts">
import { ref, computed } from 'vue'
import TopHeader from '../components/layout/TopHeader.vue'
import LeftSidebar from '../components/layout/LeftSidebar.vue'
import TabBar from '../components/layout/TabBar.vue'
import ContentRenderer from '../components/content/ContentRenderer.vue'
import type { MenuItem } from '@/types/menu'

const tabList = ref<MenuItem[]>([])
const activeTab = ref<string>('')

const handleOpenTab = (menu: MenuItem): void => {
  const exists = tabList.value.find((tab) => tab.key === menu.key)

  if (!exists) {
    tabList.value.push({ ...menu })
  }

  activeTab.value = menu.key
}

const handleChangeTab = (key: string): void => {
  activeTab.value = key
}

const handleCloseTab = (key: string): void => {
  const index = tabList.value.findIndex((tab) => tab.key === key)
  if (index === -1) return

  tabList.value.splice(index, 1)

  if (activeTab.value === key) {
    activeTab.value =
        tabList.value[index - 1]?.key ||
        tabList.value[0]?.key ||
        ''
  }
}

const currentTab = computed<MenuItem | null>(() => {
  return tabList.value.find((tab) => tab.key === activeTab.value) || null
})
</script>

<template>
  <div class="architecture-page">
    <div class="layout-grid">
      <div class="block block-1">
        <TopHeader />
      </div>

      <div class="block block-2">
        <LeftSidebar @open-tab="handleOpenTab" />
      </div>

      <div class="block block-3">
        <TabBar
            :tabs="tabList"
            :active-tab="activeTab"
            @change-tab="handleChangeTab"
            @close-tab="handleCloseTab"
        />
      </div>

      <div class="block block-4">
        <ContentRenderer v-if="currentTab" :tab="currentTab" />
        <div v-else class="empty-content">
          请从左侧菜单打开一个标签页
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/styles/views/architecture-view.css"></style>
