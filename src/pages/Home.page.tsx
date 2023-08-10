import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import apiAjax from "../service/APIAjax"
import { useNavigate } from "react-router-dom"

import { AnimeResponse } from "../types/anime.types"

import { useSearchStore } from "../store/searchStore"

import AnimeCardList from "../components/Anime/AnimeCardList"
import AnimeCardCarousel from "../components/Anime/AnimeCardCarousel"
import SkeletonAnimeCardList from "../components/Anime/Skeleton/SkeletonAnimeCardList"
import SkeletonAnimeCardCarousel from "../components/Anime/Skeleton/SkeletonAnimeCardCarousel"

const baseURL = import.meta.env.VITE_API_URL

const Home = () => {
  const navigate = useNavigate()

  const [setAnimeGenres, clearFilters, changeStatus, changeOrdering] =
    useSearchStore((state) => [
      state.setAnimeGenres,
      state.clearFilters,
      state.changeStatus,
      state.changeOrdering,
    ])

  const fetchSeasonalAnime = async (): Promise<AnimeResponse> => {
    const result = await apiAjax.get(`seasons/now?limit=20`)

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
    if (isLoading_SeasonalAnime) return <SkeletonAnimeCardCarousel />

    // it will show error message if there is an error
    if (error_SeasonalAnime || !data_SeasonalAnime)
      return <div>something went wrong</div>

    return <AnimeCardCarousel data={data_SeasonalAnime.data} />
  }

  const fetchTopAnime = async (): Promise<AnimeResponse> => {
    const result = await apiAjax.get(`top/anime?limit=20`)

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
    if (isLoading_TopAnime) return <SkeletonAnimeCardCarousel />

    // it will show error message if there is an error
    if (error_TopAnime || !data_TopAnime) return <div>something went wrong</div>

    return <AnimeCardCarousel data={data_TopAnime.data} />
  }

  const handleNavigateToPopularAiring = () => {
    clearFilters()
    changeStatus("airing")

    navigate("/search")
  }

  const handleNavigateToTop = () => {
    clearFilters()
    changeOrdering("score")

    navigate("/search")
  }

  return (
    <div className="w-full p-2 h-full gap-6 flex flex-col">
      <div>
        <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
          Popular this season
          <button
            onClick={handleNavigateToPopularAiring}
            className="text-sm ml-3 opacity-50 transition-all ease-in-out duration-200 hover:opacity-75 font-light"
          >
            see all airing anime
          </button>
        </h2>
        <div className="h-0.5 w-full bg-sp-main mb-1"></div>
        {renderSeasonalAnime()}
      </div>
      <div>
        <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
          Top Anime
          <button
            onClick={handleNavigateToTop}
            className="text-sm ml-3 opacity-50 transition-all ease-in-out duration-200 hover:opacity-75 font-light"
          >
            see all Top anime
          </button>
        </h2>
        <div className="h-0.5 w-full bg-sp-main mb-1"></div>
        {renderTopAnime()}
      </div>
    </div>
  )
}
export default Home
