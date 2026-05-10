<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const manifest = ref(null)
const loading = ref(true)
const error = ref(null)

const layoutMode = ref('list')
const userOverride = ref(false)

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
  if (val && !userOverride.value) {
    layoutMode.value = val.pdfs && val.pdfs.length >= 30 ? 'grid' : 'list'
  }
}, { immediate: true })

function openPdf(pdfPath) {
  router.push({ name: 'viewer', query: { path: pdfPath } })
}

function toggleLayout() {
  userOverride.value = true
  layoutMode.value = layoutMode.value === 'list' ? 'grid' : 'list'
}

const smallGroups = computed(() => {
  const result = []
  if (!manifest.value?.pdfs) return result
  const list = manifest.value.pdfs
  for (let i = 0; i < list.length; i += 10) {
    result.push(list.slice(i, i + 10))
  }
  return result
})

const largeGroups = computed(() => {
  const result = []
  for (let i = 0; i < smallGroups.value.length; i += 10) {
    result.push({
      idx: i,
      smallGroups: smallGroups.value.slice(i, i + 10),
    })
  }
  return result
})

function shortName(name) {
  return name.length > 4 ? name.slice(0, 4) + '..' : name
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

      <button class="layout-switch" @click="toggleLayout" :title="layoutMode === 'list' ? '切换到网格布局' : '切换到列表布局'">
        <svg v-if="layoutMode === 'list'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      </button>

      <ul v-if="layoutMode === 'list'" class="toc-list">
        <li
          v-for="pdf in manifest.pdfs"
          :key="pdf.path"
          class="toc-list-item"
          @click="openPdf(pdf.path)"
        >
          <span class="toc-list-name">{{ pdf.displayName }}</span>
        </li>
      </ul>

      <div v-else class="toc-grid">
        <div
          v-for="lg in largeGroups"
          :key="lg.idx"
          class="toc-large-group"
        >
          <div
            v-for="(sg, sgIdx) in lg.smallGroups"
            :key="sgIdx"
            class="toc-small-group"
          >
            <div class="sg-buttons">
              <button
                v-for="pdf in sg"
                :key="pdf.path"
                class="toc-btn"
                @click="openPdf(pdf.path)"
                :title="pdf.displayName"
              >
{{ shortName(pdf.displayName) }}
              </button>
            </div>
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
  padding: 5rem 0.5rem 2rem;
  position: relative;
}

.toc-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-primary);
  letter-spacing: 0.1em;
  flex-shrink: 0;
}

/* ── Layout switch button ── */
.layout-switch {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 15;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-background);
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.layout-switch:hover {
  background: var(--color-secondary);
}

/* ── List layout ── */
.toc-list {
  list-style: none;
  width: 100%;
  max-width: 500px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
}

.toc-list-item {
  background: var(--color-very-light);
  border: 1px solid var(--color-light);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  flex-shrink: 0;
}

.toc-list-item:hover {
  background: #F0F0F0;
  border-color: var(--color-primary);
}

.toc-list-name {
  display: block;
  font-size: 1rem;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20em;
}

/* ── Grid layout ── */
.toc-grid {
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 1800px;
  flex: 1;
  overflow-y: auto;
  align-content: start;
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

.toc-large-group {
  background: var(--color-very-light);
  border: 1px solid var(--color-light);
  border-radius: 8px;
  padding: 0.75rem;
}

.toc-small-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 0.35rem;
}

.toc-small-group:last-child {
  margin-bottom: 0;
}

.sg-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.toc-btn {
  flex: 0 0 calc(10% - 2px);
  background: var(--color-background);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0.3em 0.3em;
  font-size: 0.9rem;
  color: var(--color-text);
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 4em;
}

.toc-btn:hover {
  background: var(--color-light);
  border-color: var(--color-primary);
}

@media (max-width: 767px) {
  .toc-btn {
    flex: 0 0 calc(20% - 2px);
  }
}

/* ── State styles ── */
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
