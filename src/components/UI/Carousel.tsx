import { useEffect, useState, useRef } from "react"

interface Props {
  children: React.ReactNode[]
  intervalDuration?: number
  className?: string
}

// renders list of items that are scrollable
// can be scrolled by pressing on one of 2 buttons to scroll to the left or right
// scrolls by itself to the right once in a 5 seconds (if different intervalDuration was not passed)
// on mobile can be scrolled by swipe, after swipe ends it will round position to the multiplier of child
const Carousel = ({ children, intervalDuration = 5000, className }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null) // ref that will store carousel, parent of content that is scrolled

  const [isCursorOnComponent, setIsCursorOnComponent] = useState<boolean>(false)
  const [isOnPause, setIsOnPause] = useState<boolean>(false)

  // calls a function to scroll in the given direction
  // pauses scroll for 5 seconds (if different intervalDuration was not passed) when is called
  const handleScroll = (direction: "left" | "right") => {
    const childrenWidth =
      (carouselRef?.current?.scrollWidth || 0) / children.length

    scrollToPosition(direction === "left" ? -childrenWidth : childrenWidth)

    setIsOnPause(true)

    setTimeout(() => {
      setIsOnPause(false)
    }, intervalDuration)
  }

  const scrollToPosition = (distance: number) => {
    if (
      carouselRef.current?.scrollLeft === undefined ||
      carouselRef.current?.scrollLeft === null
    )
      return

    const container = carouselRef.current

    // total scroll width
    const scrollWidth = container.scrollWidth

    // current scroll position
    const currentScrollLeft = container.scrollLeft

    // visible with of the carousel
    const clientWidth = container.clientWidth

    // calculates the next position
    let nextScrollLeft = currentScrollLeft + distance

    // if its on last element and user scrolls to the next it will scroll to the start, if its on first element and user scrolls to the previous it will go to the last
    if (nextScrollLeft < -distance + 1) {
      nextScrollLeft = scrollWidth - container.clientWidth
    } else if (nextScrollLeft - distance >= scrollWidth - clientWidth) {
      nextScrollLeft = 0
    }

    // scrolls to the new position
    container.scroll({
      left: nextScrollLeft,
      behavior: "smooth",
    })
  }

  // tracks touch interactions
  let touchStartX = 0

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX = event.touches[0].clientX
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (
      carouselRef?.current?.scrollLeft === undefined ||
      carouselRef?.current?.scrollLeft === null
    )
      return

    const container = carouselRef.current
    const touchMoveX = event.touches[0].clientX
    const deltaX = touchMoveX - touchStartX

    container.scrollLeft -= deltaX
    touchStartX = touchMoveX
  }

  const handleTouchEnd = () => {
    if (
      carouselRef?.current?.scrollLeft === undefined ||
      carouselRef?.current?.scrollLeft === null
    )
      return

    const childrenWidth =
      (carouselRef?.current?.scrollWidth || 0) / children.length

    const container = carouselRef.current
    const currentScrollLeft = container.scrollLeft
    const roundedScrollLeft =
      Math.round(currentScrollLeft / childrenWidth) * childrenWidth

    container.scroll({
      left: roundedScrollLeft,
      behavior: "smooth",
    })
  }

  // detects when cursor enters the component
  const handleMouseEnter = () => {
    setIsCursorOnComponent(true)
  }

  // detects when cursor leaves the component
  const handleMouseLeave = () => {
    setIsCursorOnComponent(false)
  }

  // auto scrolls when user's cursor is not on carousel and they have not clicked move left or move right buttons in the past 5 seconds
  useEffect(() => {
    if (isOnPause || isCursorOnComponent) return

    const interval = setInterval(() => {
      handleScroll("right")
    }, intervalDuration)

    return () => {
      clearInterval(interval)
    } // cleans up the interval when component unmounts
  }, [isOnPause, isCursorOnComponent])

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex gap-2 overflow-x-hidden"
      >
        {children}
      </div>
      {carouselRef?.current?.scrollWidth !==
      carouselRef?.current?.clientWidth ? (
        <>
          <button
            onClick={() => {
              handleScroll("left")
            }}
            className="px-5 py-3 rounded-full opacity-60 hover:opacity-80 transition-all ease-in-out duration-200 font-bold dark:text-white dark:bg-sp-gray bg-sp-white text-sp-black absolute top-1/2 left-2 shadow-sm hover:shadow:md"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              handleScroll("right")
            }}
            className="px-5 py-3 rounded-full opacity-60 hover:opacity-80 transition-all ease-in-out duration-200 dark:bg-sp-gray dark:text-white font-bold bg-sp-white text-sp-black absolute top-1/2 right-2 shadow-sm hover:shadow:md"
          >
            {">"}
          </button>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  )
}
export default Carousel
