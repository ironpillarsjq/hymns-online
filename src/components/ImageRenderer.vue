<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  initialIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['loaded', 'error', 'pageChange'])

const currentIndex = ref(props.initialIndex)
const loadState = ref('loading')
const errorMsg = ref('')

const totalImages = computed(() => props.images.length)
const currentSrc = computed(() => {
  if (props.images.length === 0) return ''
  return props.images[currentIndex.value] || ''
})

function preloadImage(src) {
  if (!src) return
  const img = new Image()
  img.src = src
}

function preloadAdjacent() {
  if (currentIndex.value > 0) {
    preloadImage(props.images[currentIndex.value - 1])
  }
  if (currentIndex.value < props.images.length - 1) {
    preloadImage(props.images[currentIndex.value + 1])
  }
}

function goToImage(index) {
  if (index < 0 || index >= props.images.length) return
  currentIndex.value = index
  loadState.value = 'loading'
  preloadAdjacent()
}

function onImgLoad() {
  loadState.value = 'loaded'
  emit('pageChange', currentIndex.value + 1)
  preloadAdjacent()
}

function onImgError() {
  loadState.value = 'error'
  errorMsg.value = '图片加载失败'
  emit('error', errorMsg.value)
}

function nextImage() {
  if (currentIndex.value < props.images.length - 1) {
    goToImage(currentIndex.value + 1)
  }
}

function prevImage() {
  if (currentIndex.value > 0) {
    goToImage(currentIndex.value - 1)
  }
}

watch(() => props.images, (val) => {
  if (val && val.length > 0) {
    currentIndex.value = 0
    loadState.value = 'loading'
    emit('loaded', { numImages: val.length })
  }
}, { immediate: true })

defineExpose({ currentIndex, totalImages, goToImage, nextImage, prevImage })
</script>

<template>
  <div class="image-renderer">
    <img
      v-if="currentSrc && loadState !== 'error'"
      :src="currentSrc"
      class="renderer-img"
      :class="{ 'img-loading': loadState === 'loading' }"
      alt=""
      @load="onImgLoad"
      @error="onImgError"
    />

    <div v-if="loadState === 'loading'" class="renderer-overlay">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="loadState === 'error'" class="renderer-overlay renderer-error">
      <p class="error-text">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<style scoped>
.image-renderer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--color-background);
}

.renderer-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  transition: opacity 0.15s ease;
}

.img-loading {
  opacity: 0;
}

.renderer-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--color-text-light);
  background: var(--color-background);
  z-index: 5;
}

.renderer-error .error-text {
  color: var(--color-error);
  font-size: 1.1rem;
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
</style>
