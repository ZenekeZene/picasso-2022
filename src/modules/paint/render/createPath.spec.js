import createPath from './createPath'

describe('createPath', () => {
  it('create a path with correct attributes and returns it', () => {
    const path = createPath(0, 10, 'red')

    expect(path.tagName).toBe('path')
    expect(path).toHaveAttribute('id', 'path-0')
    expect(path).toHaveAttribute('stroke', 'red')
    expect(path).toHaveAttribute('fill', 'red')
    expect(path).toHaveAttribute('stroke-width', '10')
  })

  it('adds opacity if It is given as option', () => {
    const path = createPath(0, 10, 'red', { opacity: 0.5 })
    expect(path).toHaveAttribute('opacity', '0.5')
  })

  it('adds classnames if they are given as options (glow & blop)', () => {
    const path = createPath(0, 10, 'red', { glow: true, blop: true })
    expect(path).toHaveClass('with-glow')
    expect(path).toHaveClass('with-blop')
  })
})
