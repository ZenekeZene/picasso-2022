const checkMobile = () => {
  return "ontouchstart" in document.documentElement
}

export default checkMobile

