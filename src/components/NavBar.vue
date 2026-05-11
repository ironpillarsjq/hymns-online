<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sites = ref([])

onMounted(async () => {
  try {
    const base = import.meta.env.BASE_URL
    const resp = await fetch(`${base}data/manifest.json`)
    if (!resp.ok) return
    const manifest = await resp.json()
    sites.value = manifest.sites || []
  } catch (e) {
    console.warn('[NavBar] 无法加载 manifest:', e)
  }
})
</script>

<template>
  <nav class="nav-bar">
    <router-link
      class="nav-link"
      :class="{ active: route.name === 'home' }"
      :to="{ name: 'home' }"
    >主页</router-link>
    <router-link
      v-for="site in sites"
      :key="site.name"
      class="nav-link"
      :class="{ active: route.name === 'site' && route.params.siteName === site.name }"
      :to="{ name: 'site', params: { siteName: site.name } }"
    >{{ site.title }}</router-link>
    <router-link
      class="nav-link"
      :class="{ active: route.name === 'help' }"
      :to="{ name: 'help' }"
    >帮助</router-link>
  </nav>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.5rem;
  background: var(--color-light);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: 1rem;
  padding: 0.3em 0.6em;
  border-radius: 4px;
  transition: background 0.2s;
}

.nav-link:hover {
  background: var(--color-text-light);
  color: #FFFFFF;
}

.nav-link.active {
  background: var(--color-primary);
  color: #FFFFFF;
  font-weight: 700;
}
</style>
