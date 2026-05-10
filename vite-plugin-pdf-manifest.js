import fs from 'node:fs'
import path from 'node:path'

function deriveDisplayName(fileName) {
  const name = path.basename(fileName, '.pdf')
  if (/[\u4e00-\u9fff]/.test(name)) {
    return name
  }
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
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
  const pdfDir = path.join(publicDataDir, siteDir.name)
  const files = fs.readdirSync(pdfDir).filter(f => f.toLowerCase().endsWith('.pdf'))

  return {
    siteTitle: siteDir.name,
    pdfs: files.map(file => ({
      fileName: path.basename(file, '.pdf'),
      displayName: deriveDisplayName(file),
      path: `data/${siteDir.name}/${file}`,
    })),
  }
}

export default function pdfManifestPlugin() {
  let root = process.cwd()

  return {
    name: 'vite-plugin-pdf-manifest',

    configResolved(config) {
      root = config.root
      const workerSrc = path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs')
      const workerDest = path.join(root, 'public', 'pdf.worker.min.mjs')
      if (fs.existsSync(workerSrc)) {
        fs.copyFileSync(workerSrc, workerDest)
      }
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/data/manifest.json') {
          const manifest = generateManifest(root)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(manifest ?? { siteTitle: '', pdfs: [] }))
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
