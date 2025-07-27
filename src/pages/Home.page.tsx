import { useQuery } from "@tanstack/react-query"
import backendAjax from "../service/backendAjax"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { animeGenreResponse, animeGenre } from "../types/anime.types"

import { useSearchStore } from "../store/searchStore"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

import Page from "../components/UI/Page"
import AnimeSection from "../components/Anime/AnimeSection"
import Hero from "../components/UI/Hero"

const Home = () => {
  const navigate = useNavigate()

  const [randomGenre, setRandomGenre] = useState<animeGenre | null>(null)

  const [setAnimeGenres, clearFilters, changeStatus, changeOrdering, changeSorting, selectGenre] =
    useSearchStore((state) => [
      state.setAnimeGenres,
      state.clearFilters,
      state.changeStatus,
      state.changeOrdering,
      state.changeSorting,
      state.selectGenre,
    ])

  // function to get genres from backend
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

  useDocumentTitle("AXP")

  useEffect(() => {
    if (!data || isLoading || error) return

    // returns different genre every 1 hour
    const genRandomGenre = (data: animeGenre[]) => {
      const currentTime = Number(new Date())
      const hoursSinceEpoch = Math.floor(currentTime / (1000 * 60 * 60)) // convert milliseconds to hours

      const randomIndex = hoursSinceEpoch % data.length
      return data[randomIndex]
    }

    setAnimeGenres(data)
    setRandomGenre(genRandomGenre(data.data))
  }, [data, setAnimeGenres, setRandomGenre, error, isLoading])

  const handleNavigateToPopularAiring = () => {
    clearFilters()
    changeStatus("airing")

    navigate("/search/anime")
  }

  const handleNavigateToTop = () => {
    clearFilters()
    changeOrdering("score")

    navigate("/search/anime")
  }

  const handleNavigateToRandomGenrePopularAnime = () => {
    if (!randomGenre?.mal_id) return

    clearFilters()
    changeOrdering("popularity")
    changeSorting("asc")
    selectGenre(randomGenre.mal_id)

    navigate("/search/anime")
  }

  return (
    <Page className="w-full p-2 h-full gap-6 flex flex-col max-w-7xl mx-auto">
      {/* <Hero /> */}
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
    </Page>
  )
}
export default Home
