import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import backendAjax from "../service/backendAjax"

import { useAuthStore } from "../store/authStore"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

import { UserResponse, FriendsResponseType } from "../types/user.types"

import UserIcon from "../components/Person/UserIcon"
import AnimeCardList from "../components/Anime/AnimeCardList"
import FriendList from "../components/Person/FriendList"
import AddFriendButton from "../components/Person/AddFriendButton"
import RemoveFriendButton from "../components/Person/RemoveFriendButton"

const Profile = () => {
  const { username: pageOwnersUsername } = useParams()

  const [username] = useAuthStore((state) => [state.username])

  const fetchFriends = async (): Promise<FriendsResponseType> => {
    const response = await backendAjax.get(
      `/user/${pageOwnersUsername}/friends`
    )
    const data = response.data
    return data
  }

  const {
    data: friends_data,
    isLoading: friends_isLoading,
    error: friends_error,
  } = useQuery({
    queryKey: ["friends", pageOwnersUsername],
    queryFn: fetchFriends,
    staleTime: 1000000,
  })

  // function to fetch user's data
  const fetchUserData = async (): Promise<UserResponse> => {
    const response = await backendAjax.get(`/user/${pageOwnersUsername}`)
    const data = response.data
    return data
  }

  // fetches user data
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", pageOwnersUsername],
    queryFn: fetchUserData,
    staleTime: 1000000,
  })

  useDocumentTitle(pageOwnersUsername || "aniPage")

  // it will show loading while data is fetching
  if (isLoading || friends_isLoading) return <div>Loading...</div>

  if (!pageOwnersUsername || !data || !data.data || error)
    return <div>Something went wrong...</div>

  const { createdAt, favoriteAnimeIds } = data.data

  return (
    <div className="mx-auto max-w-7xl w-full p-2 h-full">
      <div className="flex justify-center mt-5 gap-4">
        <div className="flex gap-2 text-center items-center justify-center">
          <UserIcon username={pageOwnersUsername} />
        </div>
        {username !== pageOwnersUsername && friends_data?.data !== undefined ? (
          friends_data.data.includes(pageOwnersUsername) ? (
            <RemoveFriendButton username={pageOwnersUsername} />
          ) : (
            <AddFriendButton username={pageOwnersUsername} />
          )
        ) : (
          ""
        )}
      </div>

      <p className="text-center mt-3 opacity-30 dark:text-sp-white text-sp-black">
        this user has registered {createdAt}
      </p>
      <div className="my-3">
        {!friends_isLoading && !friends_error && friends_data?.data ? (
          <FriendList friends={friends_data?.data || []} />
        ) : (
          ""
        )}
      </div>

      {favoriteAnimeIds.length !== 0
        ? // <div className="mt-8">
          //   <h2>
          //     {username === pageOwnersUsername ? "your" : "this user's"} favorite
          //     anime
          //   </h2>
          //   <div className="h-0.5 w-full bg-sp-main mb-1"></div>
          //   {/* <AnimeCardList data={favoriteAnime} /> */}
          // </div>
          favoriteAnimeIds.map((id) => <div key={id}>{id}</div>)
        : ""}
    </div>
  )
}
export default Profile
