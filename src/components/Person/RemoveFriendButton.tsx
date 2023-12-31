import { useMutation, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"

import { FriendsResponseType } from "../../types/user.types"

import { useAuthStore } from "../../store/authStore"

import Button from "../UI/Button"

interface Props {
  username: string
  className?: string
}

const RemoveFriendButton = ({
  username: friendName,
  className = "",
}: Props) => {
  const queryClient = useQueryClient()

  const [username, isLoggedIn, token] = useAuthStore((state) => [
    state.username,
    state.isLoggedIn,
    state.token,
  ])

  const removeFriend = async () => {
    backendAjax.post(
      "user/remove",
      { friendName: friendName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  const mutation = useMutation({
    mutationFn: removeFriend,
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
          data: [
            ...previousFriendList.data.filter(
              (previousFriendName) => previousFriendName !== friendName
            ),
          ],
        })
      }

      if (previousFriendsFriendList) {
        await queryClient.cancelQueries(["friends", friendName])

        queryClient.setQueryData(["friends", friendName], {
          data: [
            ...previousFriendsFriendList.data.filter(
              (previousFriendName) => previousFriendName !== username
            ),
          ],
        })
      }
    },
    onError: async () => {
      // if error occurs it will add deleted user back to friend list

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
  })

  const handleRemoveFromFriendList = () => {
    if (!isLoggedIn) return

    mutation.mutate()
  }

  return (
    <Button
      onClick={handleRemoveFromFriendList}
      className={className}
    >
      Unfollow
    </Button>
  )
}
export default RemoveFriendButton
