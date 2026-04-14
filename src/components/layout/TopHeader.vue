<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type StatusType = 'checking' | 'success' | 'error'

// 先写死，后面再抽到统一配置文件
const HEALTH_URL = 'http://127.0.0.1:8080/frsocfs/api/common/health'

const systemStatus = ref<StatusType>('checking')

let timer: number | undefined

const checkBackendStatus = async (): Promise<void> => {
  systemStatus.value = 'checking'

  try {
    const response = await fetch(HEALTH_URL, {
      method: 'GET'
    })

    systemStatus.value = response.ok ? 'success' : 'error'
  } catch (error) {
    systemStatus.value = 'error'
  }
}

onMounted(() => {
  checkBackendStatus()

  // 草稿版先每 30 秒探测一次
  timer = window.setInterval(() => {
    checkBackendStatus()
  }, 30000)
})

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
</script>

<template>
  <div class="top-header">
    <div class="brand-area">
      <div class="brand-icon">✈</div>

      <div class="brand-text">
        <span class="brand-name">态势感知</span>
        <span class="brand-divider"></span>
        <span class="brand-subtitle">报文合规监测平台</span>
      </div>
    </div>

    <div class="status-area">
      <span
          class="status-dot"
          :class="{
          checking: systemStatus === 'checking',
          success: systemStatus === 'success',
          error: systemStatus === 'error'
        }"
      ></span>

      <span class="status-label">系统状态：</span>

      <span
          class="status-text"
          :class="{
          checking: systemStatus === 'checking',
          success: systemStatus === 'success',
          error: systemStatus === 'error'
        }"
      >
        {{
          systemStatus === 'checking'
              ? '检测中'
              : systemStatus === 'success'
                  ? '正常'
                  : '异常'
        }}
      </span>
    </div>
  </div>
</template>

<style scoped src="@/assets/styles/components/top-header.css"></style>