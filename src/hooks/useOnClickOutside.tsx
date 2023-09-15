import { useEffect, RefObject } from "react"

type EventHandler = (e: MouseEvent | TouchEvent) => void

// runs passed function when user clicks outside of passed ref
export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: EventHandler
) => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return
      }

      handler(e)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}
