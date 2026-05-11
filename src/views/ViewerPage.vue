<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ImageRenderer from '@/components/ImageRenderer.vue'
import PageIndicator from '@/components/PageIndicator.vue'
import NavControls from '@/components/NavControls.vue'
import PagePreviewBar from '@/components/PagePreviewBar.vue'

const route = useRoute()
const router = useRouter()

const folderPath = computed(() => {
  const p = route.query.folder || ''
  return p
})

const images = ref([])
const loadingState = ref('loading')
const totalImages = ref(0)
const currentPage = ref(0)
const errorMessage = ref('')
const controlsVisible = ref(true)

const rendererRef = ref(null)

const previewVisible = ref(false)
let previewHideTimer = null

const exitHintVisible = ref(false)
const exitHintDirection = ref('')
let exitHintTimer = null

let hideTimer = null

function resetHideTimer() {
  controlsVisible.value = true
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    controlsVisible.value = false
  }, 3000)
}

async function loadFolder() {
  try {
    const base = import.meta.env.BASE_URL
    const resp = await fetch(`${base}data/manifest.json`)
    if (!resp.ok) throw new Error('无法加载目录')
    const manifest = await resp.json()
    const allFolders = (manifest.sites || []).flatMap(s => s.folders || [])
    const folder = allFolders.find(f => f.path === folderPath.value)
    if (!folder) throw new Error('未找到该文件夹')

    images.value = folder.images.map(fn => `${base}${encodeURI(folderPath.value)}/${encodeURI(fn)}`)
    totalImages.value = folder.images.length
  } catch (err) {
    console.error('[ViewerPage] loadFolder error:', err)
    errorMessage.value = err.message || '加载失败'
    loadingState.value = 'error'
  }
}

function onLoaded(info) {
  totalImages.value = info.numImages
  currentPage.value = 1
  loadingState.value = 'loaded'
  resetHideTimer()
}

function onLoadError(msg) {
  console.error('[ViewerPage] onLoadError called:', msg)
  errorMessage.value = msg
  loadingState.value = 'error'
}

function onPageChange(pageNum) {
  currentPage.value = pageNum
  resetHideTimer()
}

function showExitHint(direction) {
  clearTimeout(exitHintTimer)
  exitHintDirection.value = direction
  exitHintVisible.value = true
  exitHintTimer = setTimeout(() => {
    exitHintVisible.value = false
    exitHintDirection.value = ''
  }, 2000)
}

function clearExitHint() {
  clearTimeout(exitHintTimer)
  exitHintVisible.value = false
  exitHintDirection.value = ''
}

function goPrev() {
  if (currentPage.value <= 1) {
    showExitHint('prev')
    return
  }
  if (rendererRef.value) rendererRef.value.prevImage()
}

function onNavPrev() {
  if (exitHintVisible.value) {
    if (exitHintDirection.value === 'prev') {
      clearExitHint()
      goBack()
      return
    }
    clearExitHint()
  }
  goPrev()
}

function onNavNext() {
  if (exitHintVisible.value) {
    if (exitHintDirection.value === 'next') {
      clearExitHint()
      goBack()
      return
    }
    clearExitHint()
  }
  goNext()
}

function goNext() {
  if (currentPage.value >= totalImages.value) {
    showExitHint('next')
    return
  }
  if (rendererRef.value) rendererRef.value.nextImage()
}

function goBack() {
  const parts = folderPath.value.split('/')
  const siteName = parts.length >= 2 ? parts[1] : ''
  if (siteName) {
    router.push({ name: 'site', params: { siteName } })
  } else {
    router.push({ name: 'home' })
  }
}

function onEditStart() {
  controlsVisible.value = true
  clearTimeout(hideTimer)
}

function onPageJump(pageNum) {
  if (rendererRef.value) {
    rendererRef.value.goToImage(pageNum - 1)
  }
  resetHideTimer()
}

function onEditCancel() {
  resetHideTimer()
}

function onPreviewNavigate(index) {
  if (rendererRef.value) {
    rendererRef.value.goToImage(index)
  }
  previewVisible.value = false
}

function startPreviewHideTimer() {
  clearTimeout(previewHideTimer)
  previewHideTimer = setTimeout(() => {
    previewVisible.value = false
  }, 1000)
}

function cancelPreviewHideTimer() {
  clearTimeout(previewHideTimer)
}

function onKeydown(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault()
    goNext()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    goPrev()
  }
}

let touchStartX = 0
let touchStartY = 0

let wheelDebounceTimer = null

function onClick(e) {
  if (e.target.closest('.page-indicator') ||
      e.target.closest('.nav-controls') ||
      e.target.closest('.preview-bar')) {
    return
  }

  if (exitHintVisible.value) {
    if (exitHintDirection.value === 'next') {
      clearExitHint()
      goBack()
      return
    }
    clearExitHint()
  }

  goNext()
}

function onWheelWindow(e) {
  if (e.target.closest('.page-indicator') ||
      e.target.closest('.nav-controls') ||
      e.target.closest('.preview-bar')) {
    return
  }
  e.preventDefault()
  if (wheelDebounceTimer) return

  if (e.deltaY > 0) {
    goNext()
  } else if (e.deltaY < 0) {
    goPrev()
  }

  wheelDebounceTimer = setTimeout(() => {
    wheelDebounceTimer = null
  }, 300)
}

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < 0) goNext()
    else goPrev()
  }
}

function onMouseMove(e) {
  resetHideTimer()
  if (window.innerWidth < 800) return
  if (e.clientX <= 30 && loadingState.value === 'loaded') {
    previewVisible.value = true
  }
}

onMounted(async () => {
  await loadFolder()
  if (loadingState.value !== 'error') {
    loadingState.value = 'loaded'
  }
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('wheel', onWheelWindow, { passive: false })
  resetHideTimer()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('wheel', onWheelWindow)
  clearTimeout(hideTimer)
  clearTimeout(previewHideTimer)
  clearTimeout(wheelDebounceTimer)
  clearTimeout(exitHintTimer)
})
</script>

<template>
  <div class="viewer-page" @click="onClick">
    <ImageRenderer
      v-if="images.length > 0"
      ref="rendererRef"
      :images="images"
      @loaded="onLoaded"
      @error="onLoadError"
      @pageChange="onPageChange"
      class="viewer-renderer"
    />

    <div v-if="loadingState === 'loading'" class="viewer-overlay">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="loadingState === 'error'" class="viewer-overlay">
      <p class="error-text">{{ errorMessage }}</p>
      <button class="back-btn" @click="goBack">返回目录</button>
    </div>

    <template v-else>
      <PagePreviewBar
        :images="images"
        :current-index="currentPage - 1"
        :total-images="totalImages"
        :visible="previewVisible"
        @navigate-to="onPreviewNavigate"
        @mouseleave="startPreviewHideTimer"
        @mouseenter="cancelPreviewHideTimer"
      />

      <PageIndicator
        :current-page="currentPage"
        :total-pages="totalImages"
        :visible="controlsVisible"
        @editstart="onEditStart"
        @jump-to="onPageJump"
        @editcancel="onEditCancel"
      />

      <NavControls
        :visible="controlsVisible"
        @prev="onNavPrev"
        @next="onNavNext"
        @back="goBack"
      />

      <div v-if="exitHintVisible" class="exit-hint-overlay">
        <div class="exit-hint-text">
          {{ exitHintDirection === 'next' ? '再次点击退出' : '再次点击返回目录' }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.viewer-page {
  width: 100%;
  height: 100%;
  background: var(--color-background);
  position: relative;
}

.viewer-renderer {
  width: 100%;
  height: 100%;
}

.viewer-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--color-text-light);
  background: var(--color-background);
  z-index: 20;
}

.error-text {
  color: var(--color-error);
  font-size: 1.1rem;
}

.back-btn {
  background: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: #FFFFFF;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: inherit;
  transition: background 0.2s;
}

.back-btn:hover {
  background: var(--color-secondary);
  border-color: var(--color-secondary);
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-light);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.exit-hint-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  pointer-events: none;
}

.exit-hint-text {
  background: rgba(0, 0, 0, 0.75);
  color: #FFFFFF;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>
