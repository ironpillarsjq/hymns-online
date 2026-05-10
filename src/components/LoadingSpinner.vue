<script setup>
</script>

<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p v-if="$slots.default"><slot /></p>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--color-text-light);
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
