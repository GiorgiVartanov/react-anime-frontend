import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import axios from "axios"

import { useAuthStore } from "../store/authStore"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

import { UserResponse } from "../types/user.types"

import UserIcon from "../components/Person/UserIcon"
import AnimeCardList from "../components/Anime/AnimeCardList"

const baseURL = import.meta.env.VITE_BACKEND_URL

const Profile = () => {
  const { username: pageOwnersUsername } = useParams()

  const [username] = useAuthStore((state) => [state.username])

  // function to fetch user's data
  const fetchUserData = (): Promise<UserResponse> =>
    axios
      .get(`${baseURL}/user/${pageOwnersUsername}`)
      .then((response) => response.data)

  // fetches user data
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", pageOwnersUsername],
    queryFn: fetchUserData,
    staleTime: 1000000,
  })

  useDocumentTitle(pageOwnersUsername || "aniPage")

  // it will show loading while data is fetching
  if (isLoading) return <div>Loading...</div>

  if (!pageOwnersUsername || !data || !data.data || error)
    return <div>Something went wrong...</div>

  const { createdAt, favoriteAnimeIds } = data.data

  return (
    <div className="mx-auto max-w-7xl w-full p-2 h-full">
      <div className="flex gap-2 text-center items-center justify-center mt-5">
        <UserIcon username={pageOwnersUsername} />
        <p className="text-center">{pageOwnersUsername}</p>
      </div>
      <p className="text-center mt-3 opacity-30 dark:text-sp-white text-sp-black">
        this user has registered {createdAt}
      </p>

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
