<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

const workerPath = import.meta.env.BASE_URL + 'pdf.worker.min.mjs'
console.log('[PdfRenderer] BASE_URL:', import.meta.env.BASE_URL)
console.log('[PdfRenderer] workerSrc:', workerPath)
pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath

const props = defineProps({
  pdfUrl: { type: String, required: true },
})

const emit = defineEmits(['loaded', 'error', 'pageChange'])

const canvasRef = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)

let pdfDoc = null
let renderTask = null

async function loadPdf() {
  console.log('[PdfRenderer] loadPdf() called, pdfUrl:', props.pdfUrl)
  try {
    const response = await fetch(props.pdfUrl)
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    const arrayBuffer = await response.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer.slice(0) })
    pdfDoc = await loadingTask.promise
    console.log('[PdfRenderer] PDF loaded successfully, numPages:', pdfDoc.numPages)
    totalPages.value = pdfDoc.numPages
    currentPage.value = 1
    emit('loaded', { numPages: pdfDoc.numPages })
    await nextTick()
    console.log('[PdfRenderer] canvas available:', !!canvasRef.value)
    if (canvasRef.value) {
      console.log('[PdfRenderer] canvas size:', canvasRef.value.width, 'x', canvasRef.value.height)
      console.log('[PdfRenderer] container size:', canvasRef.value.parentElement?.clientWidth, 'x', canvasRef.value.parentElement?.clientHeight)
    }
    await renderPage(1)
    console.log('[PdfRenderer] first page rendered successfully')
  } catch (err) {
    console.error('[PdfRenderer] loadPdf error:', err)
    console.error('[PdfRenderer] error stack:', err?.stack)
    emit('error', err.message || 'PDF 加载失败')
  }
}

function nextTick() {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

async function renderPage(pageNum) {
  console.log('[PdfRenderer] renderPage called, pageNum:', pageNum, 'pdfDoc:', !!pdfDoc, 'canvasRef:', !!canvasRef.value)
  if (!pdfDoc || !canvasRef.value) return

  if (renderTask) {
    try { await renderTask.cancel() } catch (_) { /* ignore */ }
    renderTask = null
  }

  const page = await pdfDoc.getPage(pageNum)
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  const viewport = page.getViewport({ scale: 1 })
  const container = canvas.parentElement
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight

  console.log('[PdfRenderer] viewport:', viewport.width, 'x', viewport.height)
  console.log('[PdfRenderer] container:', containerWidth, 'x', containerHeight)

  const scale = Math.min(
    containerWidth / viewport.width,
    containerHeight / viewport.height,
  )

  console.log('[PdfRenderer] scale:', scale)

  const scaledViewport = page.getViewport({ scale })
  canvas.width = scaledViewport.width
  canvas.height = scaledViewport.height

  renderTask = page.render({
    canvasContext: ctx,
    viewport: scaledViewport,
  })

  await renderTask.promise
  renderTask = null
  currentPage.value = pageNum
  emit('pageChange', pageNum)
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    renderPage(currentPage.value + 1)
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    renderPage(currentPage.value - 1)
  }
}

let resizeTimer = null
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    renderPage(currentPage.value)
  }, 150)
}

onMounted(() => {
  console.log('[PdfRenderer] onMounted, pdfUrl:', props.pdfUrl)
  loadPdf()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (renderTask) {
    try { renderTask.cancel() } catch (_) { /* ignore */ }
  }
  if (pdfDoc) {
    pdfDoc.destroy()
    pdfDoc = null
  }
})

defineExpose({ nextPage, prevPage, currentPage, totalPages, renderPage, getPdfDoc: () => pdfDoc })
</script>

<template>
  <div class="pdf-renderer">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.pdf-renderer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
}
</style>
