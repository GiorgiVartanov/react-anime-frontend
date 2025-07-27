import { useQuery } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"

import { AnimeType } from "../../types/anime.types"
import { FavoriteAnimeResponse } from "../../types/user.types"

import { useAuthStore } from "../../store/authStore"

import AnimeCard from "./AnimeCard"
import Carousel from "../UI/Carousel"

interface Props {
  data: AnimeType[]
  maxAmountShown?: number
  intervalDuration?: number
}

// carousel that shows anime cards
const AnimeCardCarousel = ({ data = [], intervalDuration = 5000 }: Props) => {
  const [username] = useAuthStore((state) => [state.username])

  // function to fetch favorite anime
  const fetchFavoriteAnime = async (): Promise<FavoriteAnimeResponse | null> => {
    if (!username) return null

    const response = await backendAjax.get(`favorite/${username}`)
    return response.data
  }

  // fetches favorite anime
  const {
    data: favoriteAnimeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorite-anime", username],
    queryFn: fetchFavoriteAnime,
    staleTime: 1000000,
  })

  const isAnimeFavorite = (anime: AnimeType): boolean => {
    return (
      favoriteAnimeData?.data !== undefined &&
      favoriteAnimeData?.data.filter(
        (favoriteAnime) => Number(favoriteAnime.mal_id) === anime.mal_id
      ).length > 0
    )
  }

  const renderForLoggedInUser = () => {
    if (!favoriteAnimeData?.data) return <></>

    // sometimes API returns items with same id (mostly in a popular section)
    const uniqueData = data.filter(
      (currentAnime, index, self) =>
        index === self.findIndex((anime) => anime.mal_id === currentAnime.mal_id)
    )

    return (
      <Carousel intervalDuration={intervalDuration}>
        {uniqueData.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            mal_id={anime.mal_id}
            isFavorite={isAnimeFavorite(anime)}
            images={anime.images}
            title={anime.title}
            className="flex-1 min-w-[200px]"
          />
        ))}
      </Carousel>
    )
  }

  const renderForGuestUser = () => {
    const uniqueData = data.filter(
      (currentAnime, index, self) =>
        index === self.findIndex((anime) => anime.mal_id === currentAnime.mal_id)
    )

    return (
      <Carousel>
        {uniqueData.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            mal_id={anime.mal_id}
            isFavorite={false}
            images={anime.images}
            title={anime.title}
            className="flex-1 min-w-[200px]"
          />
        ))}
      </Carousel>
    )
  }

  if (username && !(isLoading || error || !favoriteAnimeData?.data)) return renderForLoggedInUser()
  else return renderForGuestUser()
}

export default AnimeCardCarousel
