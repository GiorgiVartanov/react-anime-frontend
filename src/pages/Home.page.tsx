import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import { AnimeResponse } from "../types/anime.types"

import AnimeCardList from "../components/Anime/AnimeCardList"
import AnimeCardCarousel from "../components/Anime/AnimeCardCarousel"
import SkeletonAnimeCardList from "../components/Anime/Skeleton/SkeletonAnimeCardList"

const baseURL = import.meta.env.VITE_API_URL

const Home = () => {
  const fetchSeasonalAnime = async (): Promise<AnimeResponse> => {
    const result = await axios.get(`${baseURL}/seasons/now?limit=10`)

    return result.data
  }

  const {
    isLoading: isLoading_SeasonalAnime,
    error: error_SeasonalAnime,
    data: data_SeasonalAnime,
  } = useQuery({
    queryKey: ["seasonal-anime"],
    queryFn: fetchSeasonalAnime,
    staleTime: 1000000,
  })

  const renderSeasonalAnime = () => {
    // is the data is still pending it will render skeleton component
    if (isLoading_SeasonalAnime) return <SkeletonAnimeCardList amount={10} />

    // it will show error message if there is an error
    if (error_SeasonalAnime || !data_SeasonalAnime)
      return <div>something went wrong</div>

    return <AnimeCardCarousel data={data_SeasonalAnime.data} />
  }

  const fetchTopAnime = async (): Promise<AnimeResponse> => {
    const result = await axios.get(`${baseURL}/top/anime?limit=10`)

    return result.data
  }

  const {
    isLoading: isLoading_TopAnime,
    error: error_TopAnime,
    data: data_TopAnime,
  } = useQuery({
    queryKey: ["top-anime"],
    queryFn: fetchTopAnime,
    staleTime: 1000000,
  })

  const renderTopAnime = () => {
    // is the data is still pending it will render skeleton component
    if (isLoading_TopAnime) return <SkeletonAnimeCardList amount={10} />

    // it will show error message if there is an error
    if (error_TopAnime || !data_TopAnime) return <div>something went wrong</div>

    return <AnimeCardCarousel data={data_TopAnime.data} />
  }

  return (
    <div className="w-full p-2 h-full gap-6 flex flex-col">
      <div>
        <h2 className="mx-auto max-w-7xl mb-1 text-xl">Popular this season</h2>
        <div className="h-0.5 w-full bg-sp-main mb-1"></div>
        {renderSeasonalAnime()}
      </div>
      <div>
        <h2 className="mx-auto max-w-7xl mb-1 text-xl">Top Anime</h2>
        <div className="h-0.5 w-full bg-sp-main mb-1"></div>
        {renderTopAnime()}
      </div>
    </div>
  )
}
export default Home
