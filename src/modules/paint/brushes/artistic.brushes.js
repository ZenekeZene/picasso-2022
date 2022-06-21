export default {
  '🍬': {
    size: 16,
    thinning: -0.99,
    smoothing: 0,
    streamline: 0,
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
