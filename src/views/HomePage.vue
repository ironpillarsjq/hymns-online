<script setup>
import { ref, onMounted } from 'vue'

const svgContent = ref('')

onMounted(async () => {
  try {
    const base = import.meta.env.BASE_URL

    const [configResp, svgResp] = await Promise.all([
      fetch(`${base}config.json`),
      fetch(`${base}home.svg`),
    ])

    let homeTitle = ''
    let homeSubtitle = ''

    if (configResp.ok) {
      const config = await configResp.json()
      homeTitle = config.homeTitle || ''
      homeSubtitle = config.homeSubtitle || ''
      document.title = homeTitle
    }

    if (svgResp.ok) {
      const svgText = await svgResp.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(svgText, 'image/svg+xml')
      const texts = doc.querySelectorAll('text')
      if (texts.length >= 1) texts[0].textContent = homeTitle
      if (texts.length >= 2) texts[texts.length - 1].textContent = homeSubtitle
      svgContent.value = new XMLSerializer().serializeToString(doc.documentElement)
    }
  } catch (e) {
    console.warn('[HomePage] 加载失败:', e)
  }
})
</script>

<template>
  <div class="home-page" v-html="svgContent"></div>
</template>

<style>
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  padding-top: 3rem;
  overflow: hidden;
}

.home-page svg {
  max-width: 90%;
  max-height: 80%;
}
</style>
