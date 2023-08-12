import { useParams } from "react-router-dom"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import apiAjax from "../../service/APIAjax"

import { AnimeRecommendation } from "../../types/anime.types"

import SkeletonAnimeCardList from "../../components/Anime/Skeleton/SkeletonAnimeCardList"
import AnimeRecommendationCardList from "../../components/Anime/AnimeRecommendationCardList"
import AnimeCardList from "./AnimeCardList"

const baseURL = import.meta.env.VITE_API_URL

interface Props {
  id: string
}

// renders anime card list that contains animes that are similar to the one that was passed in props
const AnimeRecommendations = ({ id }: Props) => {
  const [showingMore, setShowingMore] = useState<boolean>(false)

  // fetches anime recommendations from the API
  const fetchAnime = async (): Promise<AnimeRecommendation> => {
    const response = await apiAjax.get(
      `${baseURL}/anime/${id}/recommendations?sfw`
    )

    return response.data
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["anime-recommendations", id],
    queryFn: fetchAnime,
    staleTime: 1000000,
  })

  const handleShowMore = () => {
    setShowingMore((prevState) => !prevState)
  }

  // if the data is pending renders skeleton component
  if (isLoading) return <SkeletonAnimeCardList amount={12} />

  // renders error message if it occurs
  if (error || !data) return <div>An error has occurred</div>

  if (data.data.length <= 0) return <></>

  return (
    <div>
      <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
        More anime like this one
      </h2>
      <div className="h-0.5 w-full bg-sp-main mb-1"></div>
      <AnimeCardList
        data={data.data.slice(0, showingMore ? 24 : 12).map((item) => ({
          ...item.entry,
        }))}
      />
      {data.data.length > 12 ? (
        <div className="flex">
          <button
            onClick={handleShowMore}
            className="mt-1 ml-auto opacity-50 hover:opacity-75 active:opacity-75 transition-all ease-in-out duration-100"
          >
            {showingMore ? "show less" : "show more"}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
export default AnimeRecommendations
