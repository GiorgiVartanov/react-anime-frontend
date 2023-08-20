import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"
import apiAjax from "../../service/APIAjax"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { useEffect } from "react"

import { useAuthStore } from "../../store/authStore"

import { UserResponse } from "../../types/user.types"
import { ImageType } from "../../types/anime.types"

import Button from "../UI/Button"

interface Props {
  mal_id: string
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

  // function to fetch user's data
  const fetchUserData = async (): Promise<UserResponse | null> => {
    if (!username) return null

    const response = await backendAjax.get(`user/${username}`)
    return response.data
  }

  // fetches user data
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", username],
    queryFn: fetchUserData,
    staleTime: 1000000,
  })

  const addToFavorite = () => {
    return backendAjax.post(
      "favorite/add",
      { animeId: mal_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  const mutation = useMutation({
    mutationFn: addToFavorite,
    mutationKey: ["user", username],
    onMutate: async () => {
      const user = queryClient.getQueryData<UserResponse>([
        "user",
        username,
      ])?.data

      if (!user) return

      const oldFavorites = user.favoriteAnime

      const oldFavoriteIds = oldFavorites.map((item) => item.mal_id) || []

      // if it is already marked as favorite it will be removed
      if (oldFavoriteIds.includes(mal_id)) {
        const newFavorites = user.favoriteAnime.filter(
          (favorite) => favorite.mal_id !== mal_id
        )

        const newUserData = user
        newUserData.favoriteAnime = newFavorites

        queryClient.setQueryData(["user", username], {
          data: user,
        })

        // toast.success("successfully removed anime from favorites")
      } else {
        const newFavorites = [...oldFavorites, { mal_id, title, images }]

        const newUserData = user
        newUserData.favoriteAnime = newFavorites

        queryClient.setQueryData(["user", username], {
          data: user,
        })

        // toast.success("successfully marked anime as favorite")
      }
    },
    onSettled: async (res) => {
      console.log(res)
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
      className={`font-semibold ${
        data?.data?.favoriteAnime?.map((item) => item.mal_id).includes(mal_id)
          ? "bg-opacity-50"
          : ""
      } ${className}`}
    >
      {data?.data?.favoriteAnime?.map((item) => item.mal_id).includes(mal_id)
        ? "remove from favorites"
        : "mark as favorite"}
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
