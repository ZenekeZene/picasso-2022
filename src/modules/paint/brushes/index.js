export const BRUSHES = Object.freeze({
  PENCIL: 'pencil',
  PEN: 'pen',
  QUILL: 'quill',
  PAINT_FORMAT: 'paint-format',
})

export const BRUSHES_ITERABLES = Object.values(BRUSHES)

const options = {
  [BRUSHES.PENCIL]: {
    size: 10,
    thinning: 0.1,
    smoothing: 0,
    streamline: 0,
    easing: (t) => t,
    start: {
      taper: 10,
      easing: (t) => t,
      cap: true
    },
    end: {
      taper: 10,
      easing: (t) => t,
      cap: true
    },
  },
  [BRUSHES.PEN]: {
    size: 20,
    thinning: 2,
    smoothing: 1,
    streamline: 0,
    easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  },
  [BRUSHES.QUILL]: {
    size: 16,
    thinning: -0.99,
    smoothing: 0.99,
    streamline: 0.99,
    easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    start: {
      taper: true,
      easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      cap: true
    },
    end: {
      taper: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      cap: true
    },
  },
  [BRUSHES.PAINT_FORMAT]: {
    size: 16,
    thinning: 0.1,
    smoothing: 0.5,
    streamline: 0.5,
    easing: (t) => t,
    start: {
      taper: 0,
      easing: (t) => t,
      cap: false
    },
    end: {
      taper: 0,
      easing: (t) => t,
      cap: false
    },
    opacity: 0.5,
  },
}

export default options
