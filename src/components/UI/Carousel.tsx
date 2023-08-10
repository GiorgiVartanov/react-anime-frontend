import { useEffect, useState, useRef } from "react"

interface Props {
  children: React.ReactNode[]
  className?: string
}

const Carousel = ({ children, className }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  const [amountOfShownCards, setAmountOfShownCards] = useState<number>(0)
  const [isCursorOnComponent, setIsCursorOnComponent] = useState<boolean>(false)
  const [isOnPause, setIsOnPause] = useState(false)

  const childrenWidth =
    (carouselRef?.current?.scrollWidth || 0) / children.length

  const handleScrollToNext = () => {
    if (
      carouselRef?.current?.scrollLeft === undefined ||
      carouselRef?.current?.scrollLeft === null
    )
      return

    const container = carouselRef.current
    const scrollWidth = container.scrollWidth
    const offsetWidth = container.offsetWidth
    const currentScrollLeft = container.scrollLeft

    let nextScrollLeft = currentScrollLeft + childrenWidth

    if (nextScrollLeft >= scrollWidth - amountOfShownCards * childrenWidth) {
      nextScrollLeft = 0 // scrolls to the first element
    }

    container.scroll({
      left: nextScrollLeft,
      behavior: "smooth",
    })
  }

  // scrolls back
  const handleScrollToPrevious = () => {
    if (
      carouselRef?.current?.scrollLeft === undefined ||
      carouselRef?.current?.scrollLeft === null
    )
      return

    const container = carouselRef.current
    const scrollWidth = container.scrollWidth
    const currentScrollLeft = container.scrollLeft

    let nextScrollLeft = currentScrollLeft - childrenWidth

    if (nextScrollLeft < -childrenWidth + 1) {
      nextScrollLeft = scrollWidth - container.clientWidth // scrolls to the last element
    }

    container.scroll({
      left: nextScrollLeft,
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

  useEffect(() => {
    if (isOnPause) return

    if (isCursorOnComponent) return

    const interval = setInterval(handleScrollToNext, 5000)

    return () => clearInterval(interval) // cleans up the interval when component unmounts
  }, [isOnPause, isCursorOnComponent])

  useEffect(() => {
    const calculateAmountOfCardsShown = () => {
      const screenWidth = window.innerWidth
      const childrenWidth =
        (carouselRef?.current?.scrollWidth || 0) / children.length

      const newAmountOfShownCards = 2

      //   if (screenWidth < childrenWidth * 2) newAmountOfShownCards = 2
      //   else if (screenWidth < childrenWidth * 3) newAmountOfShownCards = 3
      //   else if (screenWidth < childrenWidth * 4) newAmountOfShownCards = 4
      //   else if (screenWidth < childrenWidth * 6) newAmountOfShownCards = 6
      //   else newAmountOfShownCards = 8

      //   console.log(Math.floor(screenWidth / childrenWidth))

      //   if (amountOfShownCards === amountOfShownCards)
      //
      setAmountOfShownCards(Math.floor(screenWidth / childrenWidth))
    }

    calculateAmountOfCardsShown()

    window.addEventListener("resize", calculateAmountOfCardsShown)
    return () => {
      window.removeEventListener("resize", calculateAmountOfCardsShown)
    }
  }, [])

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      <div
        ref={carouselRef}
        className="flex gap-2 overflow-x-hidden"
      >
        {children}
      </div>
      {carouselRef?.current?.scrollWidth !==
      carouselRef?.current?.clientWidth ? (
        <>
          <button
            onClick={handleScrollToPrevious}
            className="px-5 py-3 rounded-full opacity-60 hover:opacity-80 transition-all ease-in-out duration-200 font-bold dark:text-white dark:bg-sp-gray bg-sp-white text-sp-black absolute top-1/2 left-2 shadow-sm hover:shadow:md"
          >
            {"<"}
          </button>
          <button
            onClick={handleScrollToNext}
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
