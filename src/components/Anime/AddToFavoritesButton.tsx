import { useMutation } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"

import { useAuthStore } from "../../store/authStore"

import Button from "../UI/Button"

interface Props {
  animeId: string
}

const AddToFavoritesButton = ({ animeId }: Props) => {
  const [isLoggedIn, username, token] = useAuthStore((state) => [
    state.isLoggedIn,
    state.username,
    state.token,
  ])

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
    mutationKey: ["favorites", username],
  })

  const handleAddToFavorites = () => {
    mutation.mutate()
  }

  return <Button onClick={handleAddToFavorites}>+</Button>
}
export default AddToFavoritesButton
