import apiAjax from "../../service/APIAjax"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { animePicturesResponseType } from "../../types/anime.types"

import PictureList from "../UI/PictureList"

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

  return <PictureList images={data.data} />
}
export default AnimePictures
