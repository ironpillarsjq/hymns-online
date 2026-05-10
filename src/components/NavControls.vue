<script setup>
defineProps({
  visible: { type: Boolean, default: true },
})

const emit = defineEmits(['prev', 'next', 'back'])
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="nav-controls">
      <div class="nav-spacer"></div>
      <button class="nav-btn nav-back" @click="emit('back')" title="返回目录">目录</button>
      <button class="nav-btn nav-arrow" @click="emit('prev')" title="上一页"><img class="nav-icon" src="/ico/caretleft.png" alt="上一页" /></button>
      <button class="nav-btn nav-arrow" @click="emit('next')" title="下一页"><img class="nav-icon" src="/ico/caretright.png" alt="下一页" /></button>
    </div>
  </Transition>
</template>

<style scoped>
.nav-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  z-index: 10;
}

.nav-btn {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.7);
  color: #FFFFFF;
  width: 42px;
  height: 42px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.85);
  border-color: rgba(0, 0, 0, 0.85);
}

.nav-spacer {
  flex: 1;
}

.nav-arrow {
  margin-left: 8px;
}

.nav-icon {
  width: 18px;
  height: 18px;
  display: block;
}

.nav-back {
  width: auto;
  padding: 0 16px;
  margin-left: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
