<script setup>
import { ref, onMounted } from 'vue'
import { markdownToHtml } from '@/utils/markdown.js'

const html = ref('')
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const base = import.meta.env.BASE_URL
    const resp = await fetch(`${base}help.md`)
    if (!resp.ok) throw new Error('无法加载帮助文档')
    const md = await resp.text()
    html.value = markdownToHtml(md)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="help-page">
    <div v-if="loading" class="help-state">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="help-state">
      <p class="error-text">{{ error }}</p>
    </div>

    <div v-else class="help-content" v-html="html"></div>
  </div>
</template>

<style scoped>
.help-page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 3rem 1rem 2rem;
  background-color: var(--color-background);
  color: var(--color-text);
}

.help-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

.help-content :deep(h1) {
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.help-content :deep(h2) {
  font-size: 1.3rem;
  color: var(--color-primary);
  margin: 1.5rem 0 0.75rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--color-light);
}

.help-content :deep(h3) {
  font-size: 1.05rem;
  color: var(--color-text);
  margin: 1rem 0 0.5rem;
}

.help-content :deep(p) {
  margin: 0.5rem 0;
}

.help-content :deep(ul) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.help-content :deep(li) {
  margin: 0.25rem 0;
}

.help-content :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
}

.help-content :deep(a:hover) {
  text-decoration: underline;
}

.help-content :deep(strong) {
  color: var(--color-primary);
}

.help-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-light);
  gap: 0.75rem;
}

.error-text {
  color: var(--color-error);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-light);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
