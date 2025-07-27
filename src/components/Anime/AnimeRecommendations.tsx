import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import apiAjax from "../../service/APIAjax"

import { AnimeRecommendation } from "../../types/anime.types"

import SkeletonAnimeCardList from "../../components/Anime/Skeleton/SkeletonAnimeCardList"
import AnimeCardList from "./AnimeCardList"

const baseURL = import.meta.env.VITE_API_URL

interface Props {
  id: string
}

// renders anime card list that contains animes that are similar to the one that was passed in props
const AnimeRecommendations = ({ id }: Props) => {
  const [showingMore, setShowingMore] = useState<boolean>(false)

  // function to fetch anime recommendations from the API
  const fetchAnime = async (): Promise<AnimeRecommendation> => {
    const response = await apiAjax.get(`${baseURL}/anime/${id}/recommendations?sfw`)

    return response.data
  }

  // fetches anime recommendations
  const { isLoading, error, data } = useQuery({
    queryKey: ["anime-recommendations", id],
    queryFn: fetchAnime,
    staleTime: 1000000,
  })

  // increases amount of shown recommendations
  const handleShowMore = () => {
    setShowingMore((prevState) => !prevState)
  }

  // renders anime recommendations in a AnimeCardList component
  const renderAnimeRecommendations = () => {
    if (isLoading) return <SkeletonAnimeCardList amount={12} />

    if (error || !data) return <div>An error has occurred</div>

    if (data.data.length <= 0) return <></>

    return (
      <>
        <AnimeCardList
          data={[
            data.data.slice(0, showingMore ? 24 : 12).map((item) => ({
              ...item.entry,
            })),
          ]}
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
      </>
    )
  }

  // if this show does not have recommendations
  if (data && data?.data?.length === 0) return <></>

  return (
    <section>
      <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
        More anime like this one
      </h2>
      <div className="h-0.5 w-full bg-sp-main mb-1"></div>
      {renderAnimeRecommendations()}
    </section>
  )
}
export default AnimeRecommendations
