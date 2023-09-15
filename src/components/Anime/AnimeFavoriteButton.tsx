import { useQuery } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"

import { FavoriteAnimeResponse } from "../../types/user.types"
import { ImageType } from "../../types/anime.types"

import { useAuthStore } from "../../store/authStore"

import AddToFavoritesButton from "./AddToFavoritesButton"
import RemoveFromFavoritesButton from "./RemoveFromFavoritesButton"
import Button from "../UI/Button"

interface Props {
  mal_id: number
  title: string
  images: ImageType
  className?: string
}

// button to add or remove anime from favorites
// AddToFavoritesButton will be rendered if anime is not in favorites
// RemoveFromFavoritesButton will be rendered if anime is in favorites
const AnimeFavoriteButton = ({ mal_id, title, images, className }: Props) => {
  const [username] = useAuthStore((state) => [state.username])

  // function to fetch user's data
  const fetchFavoriteAnime =
    async (): Promise<FavoriteAnimeResponse | null> => {
      if (!username) return null

      const response = await backendAjax.get(`favorite/${username}`)
      return response.data
    }

  // fetches user data
  const { isLoading, error, data } = useQuery({
    queryKey: ["favorite-anime", username],
    queryFn: fetchFavoriteAnime,
    staleTime: 1000000,
  })

  if (isLoading)
    return (
      <Button className={`w-full mt-3 font-semibold p-1  ${className}`}>
        Loading...
      </Button>
    )

  // checks if user is not logged in or if this anime is not in their favorite list
  if (error || data?.data?.map((item) => Number(item.mal_id)).includes(mal_id))
    return (
      <RemoveFromFavoritesButton
        mal_id={mal_id}
        title={title}
        className={className}
      />
    )

  return (
    <AddToFavoritesButton
      mal_id={mal_id}
      title={title}
      images={images}
      className={className}
    />
  )
}
export default AnimeFavoriteButton
