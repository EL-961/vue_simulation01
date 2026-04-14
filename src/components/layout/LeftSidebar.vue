<script setup lang="ts">
import { ref } from 'vue'
import type { MenuGroup, MenuItem } from '../../types/menu'
import { menuList } from '../../config/menuList'

const emit = defineEmits<{
  (e: 'open-tab', menu: MenuItem): void
}>()

const openGroups = ref<string[]>(['core'])

const toggleGroup = (key: string): void => {
  if (openGroups.value.includes(key)) {
    openGroups.value = openGroups.value.filter((item) => item !== key)
  } else {
    openGroups.value.push(key)
  }
}

const handleOpenTab = (item: MenuItem): void => {
  emit('open-tab', item)
}

const groups = menuList as MenuGroup[]
</script>

<template>
  <div class="left-sidebar">
    <div class="menu-title">功能导航</div>

    <div
        v-for="group in groups"
        :key="group.key"
        class="menu-group"
    >
      <div class="group-title" @click="toggleGroup(group.key)">
        <span>{{ group.title }}</span>
        <span>{{ openGroups.includes(group.key) ? '▼' : '▶' }}</span>
      </div>

      <div v-if="openGroups.includes(group.key)" class="group-children">
        <div
            v-for="child in group.children"
            :key="child.key"
            class="child-item"
            @click="handleOpenTab(child)"
        >
          {{ child.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-sidebar {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
}

.menu-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.menu-group {
  margin-bottom: 10px;
}

.group-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #f5f7fa;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.group-children {
  margin-top: 8px;
  padding-left: 10px;
}

.child-item {
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  color: #303133;
}

.child-item:hover {
  background: #ecf5ff;
  color: #409eff;
}
</style>