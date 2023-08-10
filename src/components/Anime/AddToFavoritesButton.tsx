import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"
import apiAjax from "../../service/APIAjax"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { useEffect } from "react"

import { useAuthStore } from "../../store/authStore"

import { UserResponse } from "../../types/user.types"

import Button from "../UI/Button"

interface Props {
  animeId: string
  className?: string
}

const AddToFavoritesButton = ({ animeId, className }: Props) => {
  const queryClient = useQueryClient()

  const [isLoggedIn, username, token] = useAuthStore((state) => [
    state.isLoggedIn,
    state.username,
    state.token,
  ])

  // function to fetch user's data
  const fetchUserData = (): Promise<UserResponse> =>
    backendAjax.get(`user/${username}`).then((response) => response.data)

  // fetches user data
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", username],
    queryFn: fetchUserData,
    staleTime: 1000000,
  })

  const addToFavorite = () => {
    return backendAjax.post(
      "favorite/add",
      { animeId: animeId },
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

      const oldFavorites = user.favoriteAnimeIds || []

      // if it is already marked as favorite it will be removed
      if (oldFavorites.includes(animeId)) {
        const newFavorites = oldFavorites.filter((id) => id !== animeId)

        const newUserData = user
        newUserData.favoriteAnimeIds = newFavorites

        queryClient.setQueryData(["user", username], {
          data: user,
        })

        // toast.success("successfully removed anime from favorites")
      } else {
        const newFavorites = [...oldFavorites, animeId]

        const newUserData = user
        newUserData.favoriteAnimeIds = newFavorites

        queryClient.setQueryData(["user", username], {
          data: user,
        })

        // toast.success("successfully marked anime as favorite")
      }
    },
    onSettled: async (a) => {
      console.log(a)
    },
  })

  const handleAddToFavorites = () => {
    if (!isLoggedIn) {
      toast.error(ToastErrorMessage)
      return
    }

    mutation.mutate()
  }

  if (isLoading) return <div>loading...</div>

  if (error || !data) return <div>something went wrong</div>

  return (
    <Button
      onClick={handleAddToFavorites}
      className={`font-semibold ${className}`}
    >
      {data?.data?.favoriteAnimeIds?.includes(animeId)
        ? "remove from favorites"
        : "mark as favorite"}
    </Button>
  )
}
export default AddToFavoritesButton

function ToastErrorMessage() {
  return (
    <Link to={`/login`}>you need to log in, to add anime to favorites</Link>
  )
}
