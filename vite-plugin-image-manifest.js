import fs from 'node:fs'
import path from 'node:path'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp']

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase()
  return IMAGE_EXTENSIONS.includes(ext)
}

function deriveDisplayName(folderName) {
  const name = folderName
  if (/[\u4e00-\u9fff]/.test(name)) {
    return name
  }
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function extractLeadingNumber(filename) {
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : null
}

function sortByNumericFilename(files) {
  return files.slice().sort((a, b) => {
    const numA = extractLeadingNumber(a)
    const numB = extractLeadingNumber(b)
    if (numA !== null && numB !== null) return numA - numB
    if (numA !== null) return -1
    if (numB !== null) return 1
    return a.localeCompare(b)
  })
}

function generateManifest(root) {
  const publicDataDir = path.join(root, 'public', 'data')

  if (!fs.existsSync(publicDataDir)) {
    return null
  }

  const subDirs = fs.readdirSync(publicDataDir, { withFileTypes: true })
    .filter(d => d.isDirectory())

  if (subDirs.length === 0) {
    return null
  }

  const siteDir = subDirs[0]
  const sitePath = path.join(publicDataDir, siteDir.name)

  const folderDirs = fs.readdirSync(sitePath, { withFileTypes: true })
    .filter(d => d.isDirectory())

  const folders = []
  for (const fd of folderDirs) {
    const folderPath = path.join(sitePath, fd.name)
    const files = fs.readdirSync(folderPath).filter(f => isImageFile(f))
    if (files.length === 0) continue

    const sorted = sortByNumericFilename(files)
    folders.push({
      folderName: fd.name,
      displayName: deriveDisplayName(fd.name),
      path: `data/${siteDir.name}/${fd.name}`,
      imageCount: sorted.length,
      images: sorted,
    })
  }

  return {
    siteTitle: siteDir.name,
    folders,
  }
}

export default function imageManifestPlugin() {
  let root = process.cwd()

  return {
    name: 'vite-plugin-image-manifest',

    configResolved(config) {
      root = config.root
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/data/manifest.json') {
          const manifest = generateManifest(root)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(manifest ?? { siteTitle: '', folders: [] }))
          return
        }
        next()
      })
    },

    generateBundle() {
      const manifest = generateManifest(root)
      if (manifest) {
        this.emitFile({
          type: 'asset',
          fileName: 'data/manifest.json',
          source: JSON.stringify(manifest, null, 2),
        })
      }
    },
  }
}
