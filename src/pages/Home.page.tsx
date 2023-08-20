import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import apiAjax from "../service/APIAjax"
import backendAjax from "../service/backendAjax"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { AnimeResponse } from "../types/anime.types"
import { animeGenreResponse, animeGenre } from "../types/anime.types"

import { useSearchStore } from "../store/searchStore"

import AnimeCardList from "../components/Anime/AnimeCardList"
import AnimeCardCarousel from "../components/Anime/AnimeCardCarousel"
// import SkeletonAnimeCardList from "../components/Anime/Skeleton/SkeletonAnimeCardList"
// import SkeletonAnimeCardCarousel from "../components/Anime/Skeleton/SkeletonAnimeCardCarousel"
import AnimeSection from "../components/Anime/AnimeSection"

const Home = () => {
  const navigate = useNavigate()

  const [randomGenre, setRandomGenre] = useState<animeGenre | null>(null)

  const [
    setAnimeGenres,
    genres,
    clearFilters,
    changeStatus,
    changeOrdering,
    changeSorting,
    selectGenre,
  ] = useSearchStore((state) => [
    state.setAnimeGenres,
    state.genres,
    state.clearFilters,
    state.changeStatus,
    state.changeOrdering,
    state.changeSorting,
    state.selectGenre,
  ])

  const fetchGenres = async (): Promise<animeGenreResponse> => {
    const response = await backendAjax.get(`anime/genres`)

    return response.data
  }

  // gets genres from API
  const { isLoading, error, data } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000000,
  })

  useEffect(() => {
    if (!data) return

    // returns different genre every 7.5 minutes
    const genRandomGenre = (data: animeGenre[]) => {
      const currentTime = Number(new Date())
      const hoursSinceEpoch = Math.floor(currentTime / (1000 * 60 * 60)) // Convert milliseconds to hours

      const randomIndex = hoursSinceEpoch % data.length // Modulo operation to cycle through data
      return data[randomIndex]
    }

    setAnimeGenres(data)
    setRandomGenre(genRandomGenre(data.data))
  }, [data, setAnimeGenres, setRandomGenre])

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

  // const randomGenre = genres[Math.floor(Math.random() * genres.length)]

  const handleNavigateToRandomGenrePopularAnime = () => {
    if (!randomGenre?.mal_id) return

    clearFilters()
    changeOrdering("popularity")
    changeSorting("asc")
    selectGenre(randomGenre.mal_id)

    navigate("/search")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full p-2 h-full gap-6 flex flex-col max-w-7xl mx-auto"
    >
      <AnimeSection
        title="Popular This Season"
        buttonText="see all airing anime"
        fetch={"seasons/now?"}
        queryKey="seasonal-anime"
        onClick={handleNavigateToPopularAiring}
      />
      <AnimeSection
        title="Top Anime"
        buttonText="see all Top anime"
        fetch={"top/anime?"}
        queryKey="top-anime"
        onClick={handleNavigateToTop}
      />
      {randomGenre?.name && randomGenre?.mal_id ? (
        <AnimeSection
          title={`Best Anime In ${randomGenre.name} Genre`}
          buttonText={`see all ${randomGenre.name} anime`}
          fetch={`anime?genres=${randomGenre.mal_id}&order_by=popularity`}
          queryKey={`top-${randomGenre.name}-anime`}
          onClick={handleNavigateToRandomGenrePopularAnime}
        />
      ) : (
        ""
      )}
    </motion.div>
  )
}
export default Home
