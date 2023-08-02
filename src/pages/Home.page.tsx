import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import { AnimeResponse } from "../types/anime.types"

import AnimeCardList from "../components/Anime/AnimeCardList"
import AnimeCardCarousel from "../components/Anime/AnimeCardCarousel"
import SkeletonAnimeCardList from "../components/Anime/Skeleton/SkeletonAnimeCardList"

const baseURL = import.meta.env.VITE_API_URL

const Home = () => {
  const fetchTopAnime = async (): Promise<AnimeResponse> => {
    const result = await axios.get(`${baseURL}/seasons/now?limit=10`)

    return result.data
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["top-anime"],
    queryFn: fetchTopAnime,
    staleTime: 1000000,
  })

  const renderPopularAnimeThisSeason = () => {
    // is the data is still pending it will render skeleton component
    if (isLoading) return <SkeletonAnimeCardList amount={10} />

    // it will show error message if there is an error
    if (error || !data) return <div>something went wrong</div>

    return <AnimeCardCarousel data={data.data} />
  }

  return (
    <div className="w-full p-2 h-full">
      <h2 className="mx-auto max-w-7xl mb-1">Popular this season</h2>
      {renderPopularAnimeThisSeason()}
    </div>
  )
}
export default Home
