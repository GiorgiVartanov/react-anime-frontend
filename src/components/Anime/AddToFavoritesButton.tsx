import { useMutation, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

import { FavoriteAnimeResponse } from "../../types/user.types"
import { ImageType } from "../../types/anime.types"

import { useAuthStore } from "../../store/authStore"

import Button from "../UI/Button"

interface Props {
  mal_id: number
  title: string
  images: ImageType
  className?: string
}

const AddToFavoritesButton = ({ mal_id, title, images, className }: Props) => {
  const queryClient = useQueryClient()

  const [isLoggedIn, username, token] = useAuthStore((state) => [
    state.isLoggedIn,
    state.username,
    state.token,
  ])

  const addToFavorite = () => {
    return backendAjax.post(
      `favorite/add/${mal_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  const mutation = useMutation({
    mutationFn: addToFavorite,
    mutationKey: ["favorite-anime", username],
    onMutate: async () => {
      const favoriteAnime = queryClient.getQueryData<FavoriteAnimeResponse>([
        "favorite-anime",
        username,
      ])?.data

      if (!favoriteAnime) return

      const oldFavoriteAnime = favoriteAnime

      const newFavoriteAnime = [...oldFavoriteAnime, { mal_id, title, images }]

      await queryClient.cancelQueries(["favorite-anime", username])

      queryClient.setQueryData(["favorite-anime", username], {
        data: newFavoriteAnime,
      })
    },
    onSuccess: () => {
      toast.success(`Successfully added ${title} to favorites`)
    },
    onError: () => {
      toast.error(`Something went wrong`)
    },
    onSettled: async (res) => {
      // console.log(res)
    },
  })

  const handleAddToFavorites = () => {
    if (!isLoggedIn) {
      toast.error(ToastErrorMessage)
      return
    }

    mutation.mutate()
  }

  return (
    <Button
      onClick={handleAddToFavorites}
      className={`w-full mt-3 font-semibold p-1 ${className}`}
    >
      mark as favorite
    </Button>
  )
}
export default AddToFavoritesButton

function ToastErrorMessage() {
  return (
    <Link to={`../register`}>
      you need to Sign Up, to add anime to favorites
    </Link>
  )
}
