import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import axios from "axios"

import { useAuthStore } from "../store/authStore"

import { UserResponse } from "../types/user.types"

import UserIcon from "../components/Person/UserIcon"

const baseURL = import.meta.env.VITE_BACKEND_URL

const Profile = () => {
  const { username } = useParams()

  // function to fetch user's data
  const fetchAnime = (): Promise<UserResponse> =>
    axios.get(`${baseURL}/user/${username}`).then((response) => response.data)

  // fetches user data
  const { isLoading, error, data } = useQuery({
    queryKey: ["user", username],
    queryFn: fetchAnime,
    staleTime: 1000000,
  })

  if (!username || !data || !data.data)
    return <div>Something went wrong...</div>

  // it will show loading while data is fetching
  if (isLoading) return <div>Loading...</div>

  const { createdAt } = data.data

  return (
    <div className="mx-auto max-w-7xl w-full p-2 h-full">
      <div className="flex gap-2 text-center items-center justify-center mt-5">
        <UserIcon username={username} />
        <p className="text-center ">{username}</p>
      </div>
      <p className="text-center mt-3 opacity-30 dark:text-sp-white text-sp-black">
        this user has registered {createdAt}
      </p>
    </div>
  )
}
export default Profile
