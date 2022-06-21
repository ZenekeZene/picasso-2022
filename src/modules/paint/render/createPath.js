export default function createPath (pointer, size, color, options) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('stroke', color)
  path.setAttribute('fill', color)
  path.setAttribute('stroke-width', size)
  path.setAttribute('id', `path-${pointer}`)

  if (options?.opacity) { path.setAttribute('opacity', options.opacity) }
  if (options?.glow) { path.classList.add('with-glow') }
  if (options?.blop) { path.classList.add('with-blop') }
  return path
}
