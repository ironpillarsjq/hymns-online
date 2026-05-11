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
    layoutMode.value = val.folders && val.folders.length >= 30 ? 'grid' : 'list'
  }
}, { immediate: true })

function openFolder(folderPath) {
  router.push({ name: 'viewer', query: { folder: folderPath } })
}

function toggleLayout() {
  userOverride.value = true
  layoutMode.value = layoutMode.value === 'list' ? 'grid' : 'list'
}

const smallGroups = computed(() => {
  const result = []
  if (!manifest.value?.folders) return result
  const list = manifest.value.folders
  for (let i = 0; i < list.length; i += 10) {
    result.push(list.slice(i, i + 10))
  }
  return result
})

const largeGroups = computed(() => {
  const result = []
  const totalFolders = manifest.value?.folders?.length || 0
  for (let i = 0; i < smallGroups.value.length; i += 10) {
    const start = i * 10 + 1
    const end = Math.min((i + 10) * 10, totalFolders)
    result.push({
      idx: i,
      range: `${start}-${end}`,
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

    <div v-else-if="!manifest || !manifest.folders || manifest.folders.length === 0" class="toc-state">
      <div class="empty-icon">📂</div>
      <p>暂无文件</p>
      <p class="hint">请将图片放入 <code>/public/data/&lt;标题&gt;/&lt;文件夹&gt;/</code> 目录中</p>
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
          v-for="folder in manifest.folders"
          :key="folder.path"
          class="toc-list-item"
          @click="openFolder(folder.path)"
        >
          <span class="toc-list-name">{{ folder.displayName }}</span>
          <span class="toc-list-count">（{{ folder.imageCount }}张）</span>
        </li>
      </ul>

      <div v-else class="toc-grid">
        <div
          v-for="lg in largeGroups"
          :key="lg.idx"
          class="toc-large-group-wrapper"
        >
          <span class="toc-group-range">{{ lg.range }}</span>
          <div class="toc-large-group">
          <div
            v-for="(sg, sgIdx) in lg.smallGroups"
            :key="sgIdx"
            class="toc-small-group"
          >
            <div class="sg-buttons">
              <button
                v-for="folder in sg"
                :key="folder.path"
                class="toc-btn"
                @click="openFolder(folder.path)"
                :title="folder.displayName"
              >
{{ shortName(folder.displayName) }}
              </button>
            </div>
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

.toc-list-count {
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-left: 0.25rem;
}

/* ── Grid layout ── */
.toc-grid {
  display: grid;
  column-gap: 1rem;
  row-gap: 2rem;
  width: 100%;
  max-width: 94vw;
  align-content: start;
  padding-top: 2rem;
}

@media (max-width: 1199px) and (min-width: 768px) {
  .toc-grid {
    grid-template-columns: repeat(auto-fit, calc((100% - 1rem) / 2));
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .toc-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1200px) {
  .toc-grid {
    grid-template-columns: repeat(auto-fit, calc((100% - 2rem) / 3));
    justify-content: center;
  }
}

.toc-large-group {
  background: var(--color-very-light);
  border: 1px solid var(--color-light);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.toc-large-group-wrapper {
  position: relative;
}

.toc-group-range {
  position: absolute;
  top: -1.5rem;
  left: 2px;
  font-size: 1.2rem;
  color: var(--color-text);
  font-weight: 600;
  white-space: nowrap;
}
.toc-small-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sg-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.sg-buttons > :first-child {
  font-weight: 700;
}

.toc-btn {
  flex: 0 0 calc((100% - 8px) / 5);
  background: var(--color-background);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0.4em 0.5em;
  font-size: 0.8rem;
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
