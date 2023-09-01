import { useMutation, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"
import { toast } from "react-toastify"

import { FavoriteAnimeResponse } from "../../types/user.types"

import { useAuthStore } from "../../store/authStore"

import Button from "../UI/Button"

interface Props {
  mal_id: number
  title: string
  className?: string
}

const RemoveFromFavoritesButton = ({ mal_id, title, className }: Props) => {
  const queryClient = useQueryClient()

  const [isLoggedIn, username, token] = useAuthStore((state) => [
    state.isLoggedIn,
    state.username,
    state.token,
  ])

  const removeFromFavorites = () => {
    return backendAjax.delete(`favorite/remove/${mal_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  const mutation = useMutation({
    mutationFn: removeFromFavorites,
    mutationKey: ["user", username],
    onMutate: async () => {
      const favoriteAnime = queryClient.getQueryData<FavoriteAnimeResponse>([
        "favorite-anime",
        username,
      ])?.data

      if (!favoriteAnime) return

      const newFavorites = favoriteAnime.filter(
        (favorite) => Number(favorite.mal_id) !== mal_id
      )

      await queryClient.cancelQueries(["favorite-anime", username])

      queryClient.setQueryData(["favorite-anime", username], {
        data: newFavorites,
      })
    },
    onSuccess: () => {
      toast.success(`Successfully removed ${title} from favorites`)
    },
    onError: () => {
      toast.error(`Something went wrong`)
    },
    onSettled: async (res) => {
      // console.log(res)
    },
  })

  const handleRemoveFromFavorites = () => {
    if (!isLoggedIn) {
      return
    }

    mutation.mutate()
  }

  return (
    <Button
      onClick={handleRemoveFromFavorites}
      className={`w-full mt-3 font-semibold p-1 ${className}`}
      // disabled={isLoading || error != null || !data?.data?.favoriteAnime}
    >
      remove from favorites
    </Button>
  )
}
export default RemoveFromFavoritesButton
