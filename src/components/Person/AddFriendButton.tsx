import { useMutation, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"

import { FriendsResponseType } from "../../types/user.types"

import { useAuthStore } from "../../store/authStore"

import Button from "../UI/Button"

interface Props {
  username: string
  className?: string
}

const AddFriendButton = ({ username: friendName, className = "" }: Props) => {
  const queryClient = useQueryClient()

  const [username, token] = useAuthStore((state) => [
    state.username,
    state.token,
  ])

  const addFriend = async () => {
    backendAjax.post(
      "user/add",
      { friendName: friendName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  const mutation = useMutation({
    mutationFn: addFriend,
    mutationKey: ["friends", username],
    onMutate: async () => {
      const previousFriendList = queryClient.getQueryData<FriendsResponseType>([
        "friends",
        username,
      ])

      const previousFriendsFriendList =
        queryClient.getQueryData<FriendsResponseType>(["friends", friendName])

      if (previousFriendList) {
        await queryClient.cancelQueries(["friends", username])

        queryClient.setQueryData(["friends", username], {
          data: [friendName, ...previousFriendList.data],
        })
      }

      if (previousFriendsFriendList) {
        await queryClient.cancelQueries(["friends", friendName])

        queryClient.setQueryData(["friends", friendName], {
          data: [username, ...previousFriendsFriendList.data],
        })
      }
    },
    // onSettled: async () => {
    // },
  })

  const handleAddToFriendList = () => {
    mutation.mutate()
  }

  return (
    <Button
      onClick={handleAddToFriendList}
      className={className}
    >
      Follow
    </Button>
  )
}
export default AddFriendButton
