import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import axios from "axios"

import { useAuthStore } from "../store/authStore"

import { UserResponse } from "../types/user.types"

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

  // it will show loading while data is fetching
  if (isLoading) return <div>Loading...</div>

  return <div className="mx-auto max-w-7xl w-full p-2 h-full">{username}</div>
}
export default Profile
