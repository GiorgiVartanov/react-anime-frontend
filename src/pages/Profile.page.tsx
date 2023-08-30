import { useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import backendAjax from "../service/backendAjax"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useEffect } from "react"

import { useAuthStore } from "../store/authStore"
import { useSettingsStore } from "../store/settingsStore"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

import {
  UserResponse,
  FriendsResponseType,
  FavoriteAnimeResponse,
} from "../types/user.types"
import { AnimeType } from "../types/anime.types"

import { ReactComponent as Gear } from "../assets/icons/gear-solid.svg"
import Page from "../components/UI/Page"
import UserIcon from "../components/Person/UserIcon"
import AnimeCardList from "../components/Anime/AnimeCardList"
import FriendList from "../components/Person/FriendList"
import AddFriendButton from "../components/Person/AddFriendButton"
import RemoveFriendButton from "../components/Person/RemoveFriendButton"
import Loading from "../components/UI/Loading"
import Button from "../components/UI/Button"

const Profile = () => {
  const navigate = useNavigate()

  const { username: pageOwnersUsername } = useParams()

  const [username] = useAuthStore((state) => [state.username])
  const [theme] = useSettingsStore((state) => [state.theme])

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

  const fetchFavoriteAnime =
    async (): Promise<FavoriteAnimeResponse | null> => {
      if (!username) return null

      const response = await backendAjax.get(`favorite/${username}`)
      return response.data
    }

  // fetches user data
  const {
    data: favoriteAnimeData,
    isLoading: favoriteAnimeIsLoading,
    error: favoriteAnimeError,
  } = useQuery({
    queryKey: ["favorite-anime", username],
    queryFn: fetchFavoriteAnime,
    staleTime: 1000000,
  })

  useDocumentTitle(pageOwnersUsername || "AXP")

  // it will show loading while data is fetching
  if (isLoading || ownersFriendsDataIsLoading || usersFriendsDataIsLoading)
    return <Loading />

  if (
    !pageOwnersUsername ||
    !data ||
    !ownersFriendsData ||
    !usersFriendsData ||
    !data?.data ||
    !ownersFriendsData?.data ||
    !usersFriendsData?.data ||
    error ||
    ownersFriendsDataError ||
    !favoriteAnimeData ||
    favoriteAnimeError
  ) {
    navigate("../error")

    return <>Something went wrong</>
  }

  const { createdAt } = data.data
  const favoriteAnime = favoriteAnimeData.data

  return (
    <Page className="mx-auto max-w-7xl w-full p-2 h-full">
      <div className="flex justify-center mt-5 gap-4">
        <div className="flex gap-2 text-center items-center justify-center">
          <UserIcon username={pageOwnersUsername} />
          {username === pageOwnersUsername ? (
            <Link to="../settings">
              <Gear
                width={24}
                height={24}
                fill={`${theme === "dark" ? "#e6eaee" : "#121212"}`}
              />
            </Link>
          ) : (
            ""
          )}
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
        {createdAt === "now"
          ? "this user just registered"
          : `this user has registered ${createdAt}`}
      </p>
      <div className="flex flex-col gap-2 mt-5">
        {!ownersFriendsDataIsLoading &&
        !ownersFriendsDataError &&
        ownersFriendsData?.data &&
        ownersFriendsData?.data.length > 0 ? (
          <div>
            <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
              {pageOwnersUsername}
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
              {pageOwnersUsername}
              <span className="opacity-50">`s favorite anime</span>
            </h2>
            <div className="h-0.5 w-full bg-sp-main mb-1"></div>
            <AnimeCardList data={[favoriteAnime]} />
          </div>
        ) : (
          ""
        )}
      </div>
    </Page>
  )
}
export default Profile
