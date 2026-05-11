<script setup>
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FullscreenButton from './components/FullscreenButton.vue'

const route = useRoute()
</script>

<template>
  <NavBar v-if="route.name !== 'viewer'" />
  <router-view />
  <FullscreenButton />
</template>

<style>
:root {
  --color-primary: #626C83;
  --color-secondary: #888FA0;
  --color-light: #D4D6DC;
  --color-very-light: #FAFAFA;
  --color-background: #FFFFFF;
  --color-text: #797979;
  --color-text-light: #AEB3BE;
  --color-error: #e57373;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}
</style>