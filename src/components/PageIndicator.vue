<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  visible: { type: Boolean, default: true },
})

const emit = defineEmits(['editstart', 'jump-to', 'editcancel'])

const isEditing = ref(false)
const editPage = ref('')
const inputRef = ref(null)

function enterEdit() {
  if (isEditing.value) return
  editPage.value = String(props.currentPage)
  isEditing.value = true
  emit('editstart')
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
      inputRef.value.select()
    }
  })
}

function confirmEdit() {
  if (!isEditing.value) return
  const num = parseInt(editPage.value, 10)
  isEditing.value = false
  if (Number.isInteger(num) && num >= 1 && num <= props.totalPages) {
    emit('jump-to', num)
  } else {
    emit('editcancel')
  }
}

function cancelEdit() {
  if (!isEditing.value) return
  isEditing.value = false
  emit('editcancel')
}

function onInputKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    confirmEdit()
  } else if (e.key === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    cancelEdit()
  } else if (e.key.startsWith('Arrow')) {
    e.stopPropagation()
  }
}
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="page-indicator">
      <template v-if="isEditing">
        <input
          ref="inputRef"
          v-model="editPage"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          class="page-input"
          @keydown="onInputKeydown"
          @blur="confirmEdit"
        />
        <span> / {{ totalPages }}</span>
      </template>
      <span v-else class="page-display" @click.stop="enterEdit">
        {{ currentPage }} / {{ totalPages }}
      </span>
    </div>
  </Transition>
</template>

<style scoped>
.page-indicator {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: #FFFFFF;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 11;
}

.page-display {
  cursor: pointer;
}

.page-input {
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: inherit;
  font-family: inherit;
  width: 3ch;
  text-align: right;
  outline: none;
  padding: 0;
  caret-color: #FFFFFF;
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
