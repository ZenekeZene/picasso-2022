import { useEffect, useRef } from "react"

const useObserverDOM = (ref, callback) => {
  const observer = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    observer.current = new MutationObserver(() => {
      callback()
    })

    observer.current.observe(ref.current, {
      attributes: false,
      childList: true
    })

    return (() => {
      observer.current.disconnect()
    })

  }, [])
}

export default useObserverDOM
