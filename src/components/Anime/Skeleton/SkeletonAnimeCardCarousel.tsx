import { useEffect, useState } from "react"

import SkeletonAnimeCard from "./SkeletonAnimeCard"

const SkeletonAnimeCardCarousel = () => {
  const [amountOfShownCards, setAmountOfShownCards] = useState<number>(0)

  useEffect(() => {
    const screenWidth = window.innerWidth

    let amountOfShownCards = 2

    if (screenWidth < 400) amountOfShownCards = 2
    else if (screenWidth < 600) amountOfShownCards = 3
    else if (screenWidth < 800) amountOfShownCards = 4
    else if (screenWidth < 1000) amountOfShownCards = 6
    else amountOfShownCards = 8

    setAmountOfShownCards(amountOfShownCards)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-2">
        {Array(amountOfShownCards)
          .fill(null)
          .map((_, index) => (
            <SkeletonAnimeCard
              key={index}
              className="flex-1 min-w-[100px]"
            />
          ))}
      </div>
    </div>
  )
}
export default SkeletonAnimeCardCarousel
