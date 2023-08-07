import { useState, useEffect } from "react"

import {
  AnimeType,
  AnimeResponse,
  ShortAnimeType,
} from "../../types/anime.types"
import { Props as AnimeCardProps } from "./AnimeCard"

import AnimeCard from "./AnimeCard"

interface Props {
  data: AnimeCardProps[] | AnimeType[] | ShortAnimeType[]
  maxAmountShown?: number
  intervalDuration?: number
}

// carousel that shows anime cards
const AnimeCardCarousel = ({ data = [], intervalDuration = 5000 }: Props) => {
  const [amountOfShownCards, setAmountOfShownCards] = useState<number>(0)
  const [dataToShow, setDataToShow] = useState<ShortAnimeType[]>(data)
  const [isCursorOnComponent, setIsCursorOnComponent] = useState<boolean>(false)
  const [isOnPause, setIsOnPause] = useState(false)

  // scrolls back and also pauses automatic scroll for 5 seconds
  const handleScrollToPrevious = () => {
    scrollToPrevious()

    setIsOnPause(true)

    setTimeout(() => {
      setIsOnPause(false)
    }, intervalDuration)
  }

  // scrolls back
  const scrollToPrevious = () => {
    setDataToShow((prevState) => [
      ...prevState.slice(1, prevState.length),
      prevState[0],
    ])
  }

  // scrolls forward and also pauses automatic scroll for 5 seconds
  const handleScrollToNext = () => {
    scrollToNext()

    setIsOnPause(true)

    setTimeout(() => {
      setIsOnPause(false)
    }, intervalDuration)
  }

  // detects when cursor enters the component
  const handleMouseEnter = () => {
    setIsCursorOnComponent(true)
  }

  // detects when cursor leaves the component
  const handleMouseLeave = () => {
    setIsCursorOnComponent(false)
  }

  // scrolls forward
  const scrollToNext = () => {
    setDataToShow((prevState) => [
      prevState[prevState.length - 1],
      ...prevState.slice(0, prevState.length - 1),
    ])
  }

  const calculateAmountOfCardsShown = () => {
    const screenWidth = window.innerWidth

    let newAmountOfShownCards = 2

    if (screenWidth < 400) newAmountOfShownCards = 2
    else if (screenWidth < 600) newAmountOfShownCards = 3
    else if (screenWidth < 800) newAmountOfShownCards = 4
    else if (screenWidth < 1000) newAmountOfShownCards = 6
    else newAmountOfShownCards = 8

    if (amountOfShownCards === amountOfShownCards)
      setAmountOfShownCards(newAmountOfShownCards)
  }

  useEffect(() => {
    if (isOnPause) return

    if (isCursorOnComponent) return

    const interval = setInterval(scrollToNext, intervalDuration)

    return () => clearInterval(interval) // cleans up the interval when component unmounts
  }, [isOnPause, isCursorOnComponent, intervalDuration])

  useEffect(() => {
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
      className="relative overflow-hidden"
    >
      <div className="flex gap-2">
        {dataToShow.slice(0, amountOfShownCards).map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            mal_id={anime.mal_id}
            url={anime.url}
            images={anime.images}
            title={anime.title}
            className="flex-1 min-w-[100px] animate-appear"
          />
        ))}
      </div>
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
      </button>
    </div>
  )
}

export default AnimeCardCarousel
