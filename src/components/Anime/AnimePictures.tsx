import apiAjax from "../../service/APIAjax"
import { useQuery } from "@tanstack/react-query"

import { animePicturesResponseType } from "../../types/anime.types"

import Carousel from "../UI/Carousel"
import SkeletonCarousel from "../UI/Skeleton/SkeletonCarousel"
import Image from "../UI/Image"

interface Props {
  animeId: string
}

// fetches and renders pictures for passed animeId
const AnimePictures = ({ animeId }: Props) => {
  // function to fetch pictures from API
  const fetchPictures = async (): Promise<animePicturesResponseType> => {
    const response = await apiAjax.get(`anime/${animeId}/pictures`)

    return response.data
  }

  // fetches pictures from API
  const { isLoading, error, data } = useQuery({
    queryKey: ["anime-pictures", animeId],
    queryFn: fetchPictures,
    staleTime: 1000000,
  })

  // function to render images
  const renderImages = () => {
    if (isLoading) return <SkeletonCarousel />

    if (error || !data) return <div>something went wrong</div>

    const images = data.data

    if (images.length === 0) return <></>

    return (
      <Carousel>
        {images.map((image, index) => {
          if (!image?.jpg?.image_url) return

          return (
            <Image
              key={image.jpg.image_url}
              src={image.jpg.large_image_url || image.jpg.image_url}
              alt={`anime-${index}`}
              loading="lazy"
              height="300"
              // width="200"
              className="shadow-md w-auto h-[300px] mx-auto md:mx-0 flex-1"
            />
          )
        })}
      </Carousel>
    )
  }

  return (
    <section>
      <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
        Images
      </h2>
      <div className="h-0.5 w-full bg-sp-main mb-1"></div>
      {renderImages()}
    </section>
  )
}
export default AnimePictures
