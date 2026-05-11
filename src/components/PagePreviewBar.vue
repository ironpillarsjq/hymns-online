<script setup>
const props = defineProps({
  images: { type: Array, default: () => [] },
  currentIndex: { type: Number, required: true },
  totalImages: { type: Number, required: true },
  visible: { type: Boolean, default: false },
})

const emit = defineEmits(['navigateTo', 'mouseleave', 'mouseenter'])

function onThumbnailClick(index) {
  emit('navigateTo', index)
}
</script>

<template>
  <div
    class="preview-bar"
    :class="{ 'preview-bar--visible': visible }"
    @mouseleave="emit('mouseleave')"
    @mouseenter="emit('mouseenter')"
  >
    <div class="preview-bar__thumbnails">
      <div
        v-for="(src, idx) in images"
        :key="idx"
        :class="['thumbnail', { 'thumbnail--active': idx === currentIndex }]"
        @click="onThumbnailClick(idx)"
      >
        <img :src="src" class="thumbnail__img" />
        <span class="thumbnail__label">{{ idx + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-bar {
  position: fixed;
  left: 0;
  top: 0;
  width: 150px;
  height: 100vh;
  z-index: 15;
  background: rgba(0, 0, 0, 0.85);
  transform: translateX(-100%);
  transition: transform 0.2s ease;
  border-radius: 0 8px 8px 0;
}

.preview-bar--visible {
  transform: translateX(0);
}

.preview-bar__thumbnails {
  height: 100%;
  overflow-y: auto;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  scrollbar-width: none;
}

.preview-bar__thumbnails::-webkit-scrollbar {
  display: none;
}

.thumbnail {
  width: 120px;
  cursor: pointer;
  border: 3px solid transparent;
  border-radius: 2px;
  transition: border-color 0.15s, box-shadow 0.15s;
  position: relative;
  box-sizing: border-box;
}

.thumbnail:hover {
  border-color: #FFFFFF;
}

.thumbnail--active {
  border-color: #FFFFFF;
  box-shadow: 0 0 0 3px #FFFFFF;
}

.thumbnail__img {
  width: 100%;
  display: block;
  border: 2px solid #888;
  box-sizing: border-box;
  object-fit: cover;
  aspect-ratio: auto;
}

.thumbnail__label {
  position: absolute;
  bottom: 2px;
  right: 2px;
  background: rgba(0, 0, 0, 0.6);
  color: #FFFFFF;
  font-size: 0.65rem;
  padding: 1px 4px;
  border-radius: 2px;
  line-height: 1.2;
}
</style>
