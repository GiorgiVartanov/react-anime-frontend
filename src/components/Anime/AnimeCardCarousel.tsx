import { useState, useEffect } from "react"

import { AnimeData, AnimeResponse } from "../../types/anime.types"
import { Props as AnimeCardProps } from "./AnimeCard"

import AnimeCard from "./AnimeCard"

interface Props {
  data: AnimeCardProps[] | AnimeData[]
  maxAmountShown?: number
  intervalDuration?: number
}

// carousel that shows anime cards
const AnimeCardCarousel = ({
  data = [],
  maxAmountShown = 5,
  intervalDuration = 5000,
}: Props) => {
  const [amountOfShownCards, setAmountOfShownCards] = useState<number>(0)
  const [dataToShow, setDataToShow] = useState<AnimeCardProps[] | AnimeData[]>(
    data
  )
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

  // scrolls forward
  const scrollToNext = () => {
    setDataToShow((prevState) => [
      prevState[prevState.length - 1],
      ...prevState.slice(0, prevState.length - 1),
    ])
  }

  useEffect(() => {
    if (isOnPause) return

    const interval = setInterval(scrollToNext, intervalDuration)

    return () => clearInterval(interval) // cleans up the interval when component unmounts
  }, [isOnPause, intervalDuration])

  useEffect(() => {
    const screenWidth = window.innerWidth

    let amountOfShownCards = 2

    if (screenWidth < 400) amountOfShownCards = 2
    else if (screenWidth < 600) amountOfShownCards = 3
    else if (screenWidth < 800) amountOfShownCards = 4
    else if (screenWidth < 1000) amountOfShownCards = 6
    else amountOfShownCards = 8

    console.log(amountOfShownCards)

    setAmountOfShownCards(amountOfShownCards)
  }, [])

  return (
    <div className="relative overflow-hidden">
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
        className="px-5 py-3 rounded-full opacity-60 hover:opacity-80 transition-all ease-in-out duration-200 bg-sp-gray absolute top-1/2 left-2"
      >
        {"<"}
      </button>
      <button
        onClick={handleScrollToNext}
        className="px-5 py-3 rounded-full opacity-60 hover:opacity-80 transition-all ease-in-out duration-200 bg-sp-gray absolute top-1/2 right-2"
      >
        {">"}
      </button>
    </div>
  )
}

export default AnimeCardCarousel
