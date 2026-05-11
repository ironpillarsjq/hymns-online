<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isFullscreen = ref(false)
const visible = ref(false)
const fullscreenSupported = ref(true)
let autoHideTimer = null

function isFullscreenActive() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement)
}

function toggleFullscreen() {
  if (!fullscreenSupported.value) return
  if (isFullscreenActive()) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

function onFullscreenChange() {
  isFullscreen.value = isFullscreenActive()
  if (isFullscreen.value) {
    visible.value = true
    clearTimeout(autoHideTimer)
    autoHideTimer = setTimeout(() => {
      visible.value = false
    }, 2000)
  }
}

function onMouseMove(e) {
  if (!fullscreenSupported.value) return
  if (e.clientY <= 60) {
    clearTimeout(autoHideTimer)
    visible.value = true
  } else {
    visible.value = false
  }
}

function onButtonMouseEnter() {
  clearTimeout(autoHideTimer)
}

onMounted(() => {
  fullscreenSupported.value = !!(document.fullscreenEnabled ?? document.webkitFullscreenEnabled)
  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('fullscreenchange', onFullscreenChange)
  document.addEventListener('webkitfullscreenchange', onFullscreenChange)
})

onUnmounted(() => {
  clearTimeout(autoHideTimer)
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
})
</script>

<template>
  <button
    v-if="fullscreenSupported"
    class="fullscreen-btn"
    :class="{ visible }"
    @click="toggleFullscreen"
    @mouseenter="onButtonMouseEnter"
    :title="isFullscreen ? '退出全屏 (F11)' : '进入全屏 (F11)'"
  >
    <img v-if="!isFullscreen" src="/public/ico/FullScreen.png" alt="进入全屏" width="24" height="24" />
    <img v-else src="/public/ico/QuitFullScreen.png" alt="退出全屏" width="24" height="24" />
  </button>
</template>

<style scoped>
.fullscreen-btn {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary);
  border: none;
  cursor: pointer;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-background);
}

.fullscreen-btn.visible {
  opacity: 1;
  pointer-events: auto;
}

.fullscreen-btn:hover {
  background: var(--color-secondary);
}
</style>
