import { useEffect, useState } from "react"

import { animePictureType } from "../../types/anime.types"

import Image from "./Image"

interface Props {
  images: animePictureType[]
  className?: string
}

const PictureList = ({ images, className }: Props) => {
  const [amountOfShownCards, setAmountOfShownCards] = useState<number>(0)
  const [dataToShow, setDataToShow] = useState<animePictureType[]>(images)

  // scrolls back
  const handleScrollToNext = () => {
    setDataToShow((prevState) => [
      ...prevState.slice(1, prevState.length),
      prevState[0],
    ])
  }

  // scrolls forward
  const handleScrollToPrevious = () => {
    setDataToShow((prevState) => [
      prevState[prevState.length - 1],
      ...prevState.slice(0, prevState.length - 1),
    ])
  }

  useEffect(() => {
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

    calculateAmountOfCardsShown()

    window.addEventListener("resize", calculateAmountOfCardsShown)
    return () => {
      window.removeEventListener("resize", calculateAmountOfCardsShown)
    }
  }, [])

  // renders images as carousel
  const renderCarouselImageList = () => {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="flex gap-2">
          {dataToShow.slice(0, amountOfShownCards).map((image, index) => (
            <Image
              key={image.jpg.image_url}
              src={image.jpg.large_image_url || image.jpg.image_url}
              alt={`anime-${index}`}
              loading="lazy"
              height="300"
              width="200"
              className="shadow-md w-[200px] h-[300px] max-w-[200px] max-h-[300px] mx-auto md:mx-0 flex-1 animate-appear"
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

  // just renders images (it will be used if there are not enough elements)
  const renderImageList = () => {
    return (
      <div className="flex gap-2">
        {dataToShow.map((image, index) => (
          <Image
            key={image.jpg.image_url}
            src={image.jpg.large_image_url || image.jpg.image_url}
            alt={`anime-${index}`}
            loading="lazy"
            height="300"
            width="200"
            className="shadow-md w-[200px] h-[300px] max-w-[200px] max-h-[300px]  mx-auto md:mx-0 flex-1 animate-appear"
          />
        ))}
      </div>
    )
  }

  if (amountOfShownCards <= dataToShow.length) return renderCarouselImageList()
  else return renderImageList()
}
export default PictureList
