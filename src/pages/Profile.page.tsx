import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import backendAjax from "../service/backendAjax"
import { motion } from "framer-motion"

import { useAuthStore } from "../store/authStore"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

import { UserResponse, FriendsResponseType } from "../types/user.types"
import { AnimeType } from "../types/anime.types"

import UserIcon from "../components/Person/UserIcon"
import AnimeCardList from "../components/Anime/AnimeCardList"
import FriendList from "../components/Person/FriendList"
import AddFriendButton from "../components/Person/AddFriendButton"
import RemoveFriendButton from "../components/Person/RemoveFriendButton"
import Loading from "../components/UI/Loading"

const Profile = () => {
  const { username: pageOwnersUsername } = useParams()

  const [username] = useAuthStore((state) => [state.username])

  // function to fetch logged in user's friend list
  const fetchUsersFriends = async (): Promise<FriendsResponseType | null> => {
    if (!username) return null

    const response = await backendAjax.get(`/user/${username}/friends`)
    const data = response.data
    return data
  }

  // fetches logged in user's friends list
  const {
    data: usersFriendsData,
    isLoading: usersFriendsDataIsLoading,
    error: usersDataError,
  } = useQuery({
    queryKey: ["friends", username],
    queryFn: fetchUsersFriends,
    staleTime: 1000000,
  })

  // function to fetch page owner's friends list
  const fetchPageOwnersFriends = async (): Promise<FriendsResponseType> => {
    const response = await backendAjax.get(
      `/user/${pageOwnersUsername}/friends`
    )
    const data = response.data
    return data
  }

  // fetches page owner's friend list
  const {
    data: ownersFriendsData,
    isLoading: ownersFriendsDataIsLoading,
    error: ownersFriendsDataError,
  } = useQuery({
    queryKey: ["friends", pageOwnersUsername],
    queryFn: fetchPageOwnersFriends,
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
  if (isLoading || ownersFriendsDataIsLoading || usersFriendsDataIsLoading)
    return <Loading />

  if (!pageOwnersUsername || !data || !data.data || error) return <></>

  const { createdAt, favoriteAnime } = data.data

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-7xl w-full p-2 h-full"
    >
      <div className="flex justify-center mt-5 gap-4">
        <div className="flex gap-2 text-center items-center justify-center">
          <UserIcon username={pageOwnersUsername} />
        </div>
        {username !== pageOwnersUsername &&
        usersFriendsData?.data !== undefined &&
        username &&
        !usersDataError ? (
          usersFriendsData?.data.includes(pageOwnersUsername) ? (
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
      <div className="flex flex-col gap-2 mt-5">
        {!ownersFriendsDataIsLoading &&
        !ownersFriendsDataError &&
        ownersFriendsData?.data &&
        ownersFriendsData?.data.length > 0 ? (
          <div>
            <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
              {username}
              <span className="opacity-50">`s friends</span>
            </h2>
            <div className="h-0.5 w-full bg-sp-main mb-1"></div>
            <FriendList friends={ownersFriendsData?.data || []} />
          </div>
        ) : (
          ""
        )}
        {favoriteAnime.length > 0 ? (
          <div>
            <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
              {username}
              <span className="opacity-50">`s favorite anime</span>
            </h2>
            <div className="h-0.5 w-full bg-sp-main mb-1"></div>
            <AnimeCardList data={[favoriteAnime]} />
          </div>
        ) : (
          ""
        )}
      </div>
    </motion.div>
  )
}
export default Profile
