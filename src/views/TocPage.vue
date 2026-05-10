<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const manifest = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const base = import.meta.env.BASE_URL
    const resp = await fetch(`${base}data/manifest.json`)
    if (!resp.ok) throw new Error('无法加载目录')
    manifest.value = await resp.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

watch(manifest, (val) => {
  if (val && val.siteTitle) {
    document.title = val.siteTitle
  }
}, { immediate: true })

function openPdf(pdfPath) {
  router.push({ name: 'viewer', query: { path: pdfPath } })
}

const chunkedPdfs = computed(() => {
  const result = []
  if (!manifest.value?.pdfs) return result
  const list = manifest.value.pdfs
  for (let i = 0; i < list.length; i += 100) {
    result.push(list.slice(i, i + 100))
  }
  return result
})

function chunkStart(index) {
  return index * 100 + 1
}
</script>

<template>
  <div class="toc-page">
    <div v-if="loading" class="toc-state">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="toc-state">
      <p class="error-text">{{ error }}</p>
    </div>

    <div v-else-if="!manifest || manifest.pdfs.length === 0" class="toc-state">
      <div class="empty-icon">📂</div>
      <p>暂无诗歌文件</p>
      <p class="hint">请将 PDF 文件放入 <code>/public/data/&lt;标题&gt;/</code> 目录中</p>
    </div>

    <template v-else>
      <h1 class="toc-title">{{ manifest.siteTitle }}</h1>
      <div class="toc-grid">
        <div
          v-for="(chunk, chunkIdx) in chunkedPdfs"
          :key="chunkIdx"
          class="toc-chunk"
        >
          <div class="chunk-header">
            {{ chunkStart(chunkIdx) }} — {{ chunkStart(chunkIdx) + chunk.length - 1 }}
          </div>
          <div class="chunk-buttons">
            <button
              v-for="pdf in chunk"
              :key="pdf.path"
              class="toc-btn"
              @click="openPdf(pdf.path)"
            >
              {{ pdf.displayName }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.toc-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 5rem 1rem 2rem;
}

.toc-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-primary);
  letter-spacing: 0.1em;
}

.toc-grid {
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 1400px;
}

@media (max-width: 1199px) and (min-width: 768px) {
  .toc-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .toc-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1200px) {
  .toc-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.toc-chunk {
  background: var(--color-very-light);
  border: 1px solid var(--color-light);
  border-radius: 8px;
  padding: 0.75rem;
}

.chunk-header {
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-light);
}

.chunk-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.toc-btn {
  flex: 0 0 calc(10% - 4px);
  background: transparent;
  border: 1px solid var(--color-light);
  border-radius: 4px;
  padding: 0.4em 0.6em;
  font-size: 0.85rem;
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toc-btn:hover {
  background: var(--color-light);
  border-color: var(--color-primary);
}

@media (max-width: 767px) {
  .toc-btn {
    flex: 0 0 calc(20% - 4px);
  }
}

.toc-state {
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

.hint {
  font-size: 0.85rem;
  color: var(--color-text-light);
}

.hint code {
  background: var(--color-light);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.85em;
}

.empty-icon {
  font-size: 3rem;
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
