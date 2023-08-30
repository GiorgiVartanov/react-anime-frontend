import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"

import { AnimeType, AnimeResponse } from "../../types/anime.types"
import { UserResponse, FavoriteAnimeResponse } from "../../types/user.types"

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
  const [username, isLoggedIn] = useAuthStore((state) => [
    state.username,
    state.isLoggedIn,
  ])

  const fetchFavoriteAnime =
    async (): Promise<FavoriteAnimeResponse | null> => {
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

  const renderForLoggedInUser = () => {
    if (!favoriteAnimeData?.data) return <></>

    return (
      <Carousel>
        {data.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            mal_id={anime.mal_id}
            isFavorite={
              favoriteAnimeData?.data.filter(
                (favoriteAnime) => Number(favoriteAnime.mal_id) === anime.mal_id
              ).length > 0
            }
            images={anime.images}
            title={anime.title}
            className="flex-1 min-w-[200px] animate-appear"
          />
        ))}
      </Carousel>
    )
  }

  const renderForGuestUser = () => {
    return (
      <Carousel>
        {data.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            mal_id={anime.mal_id}
            isFavorite={false}
            images={anime.images}
            title={anime.title}
            className="flex-1 min-w-[200px] animate-appear"
          />
        ))}
      </Carousel>
    )
  }

  if (username && !(isLoading || error || !favoriteAnimeData?.data))
    return renderForLoggedInUser()
  else return renderForGuestUser()
}

export default AnimeCardCarousel
