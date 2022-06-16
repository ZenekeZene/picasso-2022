const options = {
  pencil: {
    size: 10,
    thinning: 0.1,
    smoothing: 1,
    streamline: 1,
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
  pen: { size: 16, },
  quill: {
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
  'paint-format': {
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
  '🍬': {
    size: 16,
    thinning: -0.99,
    smoothing: 0.99,
    streamline: 0.99,
    easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    start: {
      taper: 89,
      easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      cap: true
    },
    end: {
      taper: 96,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      cap: true
    },
    blop: true
  },
  '🥶': {
    size: 16,
    thinning: -0.99,
    smoothing: 0.99,
    streamline: 0.99,
    easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    start: {
      taper: 89,
      easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      cap: true
    },
    end: {
      taper: 96,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      cap: true
    },
    effect: true
  },
  '✨': {
    size: 16,
    thinning: -0.99,
    smoothing: 0.99,
    streamline: 0.99,
    easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    start: {
      taper: 89,
      easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      cap: true
    },
    end: {
      taper: 96,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      cap: true
    },
    glow: true
  },
}

export default options
