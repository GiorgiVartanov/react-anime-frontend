import apiAjax from "../../service/APIAjax"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { animePicturesResponseType } from "../../types/anime.types"

import Carousel from "../UI/Carousel"
import Image from "../UI/Image"

interface Props {
  animeId: string
}

const AnimePictures = ({ animeId }: Props) => {
  const fetchPictures = async (): Promise<animePicturesResponseType> => {
    const response = await apiAjax.get(`anime/${animeId}/pictures`)

    return response.data
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["anime-pictures", animeId],
    queryFn: fetchPictures,
    staleTime: 1000000,
  })

  if (isLoading) return <div>loading...</div>
  if (error || !data) return <div>something went wrong</div>

  const images = data.data

  if (images.length === 0) return <></>

  return (
    <section>
      <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
        Images
      </h2>
      <div className="h-0.5 w-full bg-sp-main mb-1"></div>
      <Carousel>
        {images.map((image, index) => (
          <Image
            key={image.jpg.image_url}
            src={image.jpg.large_image_url || image.jpg.image_url}
            alt={`anime-${index}`}
            loading="lazy"
            height="300"
            // width="200"
            className="shadow-md w-auto h-[300px] mx-auto md:mx-0 flex-1"
          />
        ))}
      </Carousel>
    </section>
  )
}
export default AnimePictures
