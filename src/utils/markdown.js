export function markdownToHtml(md) {
  const lines = md.split('\n')
  const result = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    let line = raw.trim()

    if (line === '') {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      continue
    }

    line = line
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.+?)\]\((.+?)\)/g, (_, text, url) => {
        const isExternal = url.startsWith('mailto:') || url.startsWith('http')
        const target = isExternal ? ' target="_blank" rel="noopener"' : ''
        return `<a href="${url}"${target}>${text}</a>`
      })

    if (line.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false }
      result.push(`<h3>${line.slice(4)}</h3>`)
    } else if (line.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false }
      result.push(`<h2>${line.slice(3)}</h2>`)
    } else if (line.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false }
      result.push(`<h1>${line.slice(2)}</h1>`)
    } else if (line.startsWith('- ')) {
      if (!inList) {
        result.push('<ul>')
        inList = true
      }
      result.push(`<li>${line.slice(2)}</li>`)
    } else {
      if (inList) { result.push('</ul>'); inList = false }
      result.push(`<p>${line}</p>`)
    }
  }

  if (inList) {
    result.push('</ul>')
  }

  return result.join('\n')
}
