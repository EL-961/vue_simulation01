<script setup>
import { ref, computed } from 'vue'
import TopHeader from '../components/layout/TopHeader.vue'
import LeftSidebar from '../components/layout/LeftSidebar.vue'
import TabBar from '../components/layout/TabBar.vue'

import View41 from '../components/module4/View41.vue'
import View42 from '../components/module4/View42.vue'
import View43 from '../components/module4/View43.vue'

const tabList = ref([]) //已经打开了哪些标签
const activeTab = ref('') //当前激活了哪些标签

const componentMap = {
  view41: View41,
  view42: View42,
  view43: View43
}

//用于传入左菜单栏子组件的函数，为了实现打开标签页，同时判断是否需要压入tabList中
function handleOpenTab(menu) {
  const exists = tabList.value.find(tab => tab.key === menu.key)

  if (!exists) {
    tabList.value.push(menu)
  }

  activeTab.value = menu.key
}
// 用于传入标签栏子组件的函数，为了实现子通知父，父切换
function handleChangeTab(key) {
  activeTab.value = key
}
// 用于传入标签栏子组件的函数，为了实现关闭标签并从tabList删掉，同时激活前一个标签，没有就清空激活状态
function handleCloseTab(key) {
  const index = tabList.value.findIndex(tab => tab.key === key)
  if (index === -1) return

  tabList.value.splice(index, 1)

  if (activeTab.value === key) {
    if (tabList.value.length > 0) {
      activeTab.value = tabList.value[Math.max(0, index - 1)]?.key || ''
    } else {
      activeTab.value = ''
    }
  }
}

const currentComponent = computed(() => {
  if (!activeTab.value) return null
  return componentMap[activeTab.value]
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

<!--      <component :is="currentComponent" />意思是告诉 <component>：现在应该渲染谁-->
      <div class="block block-4">
        <component v-if="currentComponent" :is="currentComponent" />
        <div v-else class="empty-content">
          请从左侧菜单打开一个标签页
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/views/architecture-view.css"></style>