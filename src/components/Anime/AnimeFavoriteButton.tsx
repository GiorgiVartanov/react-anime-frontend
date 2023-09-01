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

  if (isLoading) return <Button className={className}>Loading...</Button>

  if (error || !data?.data) return <div>error</div>

  if (data?.data?.map((item) => Number(item.mal_id)).includes(mal_id))
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
