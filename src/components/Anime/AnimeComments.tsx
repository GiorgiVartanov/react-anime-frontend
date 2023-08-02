import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

import { CommentType } from "../../types/comment.types"

import { useAuthStore } from "../../store/authStore"

import CommentList from "../../components/Comments/CommentList"

const baseURL = import.meta.env.VITE_BACKEND_URL

interface Props {
  id: string
}

const AnimeComments = ({ id }: Props) => {
  const navigate = useNavigate()

  const [showingMore, setShowingMore] = useState<boolean>(false)

  const [isLoggedIn, token, logoutUser] = useAuthStore((state) => [
    state.isLoggedIn,
    state.token,
    state.logoutUser,
  ])

  // function that is used to fetch comments
  const fetchAnimeComments = async (): Promise<{ data: CommentType[] }> => {
    let data: Promise<{ data: CommentType[] }>

    try {
      if (isLoggedIn) {
        const response = await axios.get(`${baseURL}/comments/${id}/logged`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        data = response.data
      } else {
        const response = await axios.get(`${baseURL}/comments/${id}`)

        data = response.data
      }
    } catch (error: any) {
      // if isLoggedIn was true, while session token expired
      if (error.response.statusText === "Unauthorized" && isLoggedIn === true) {
        console.log("token expired")

        toast("your session expired, please, log in again")

        logoutUser()
        navigate(`../login`)
      }
      data = Promise.resolve({ data: [] })
    }

    return data
  }

  // fetches comments from the backend
  const { isLoading, error, data } = useQuery({
    queryKey: ["anime-comments", id],
    queryFn: fetchAnimeComments,
    staleTime: 1000000,
  })

  const handleShowMore = () => {
    setShowingMore((prevState) => !prevState)
  }

  if (isLoading) return <div>Loading...</div>

  if (error || !data) return <div>Something went wrong</div>

  const showPerPage = 8

  return (
    <div>
      <CommentList
        comments={data.data}
        showPerPage={showPerPage}
        animeId={id}
      />
      {/* {data.data.length > 4 ? (
        <div className="flex">
          <button
            onClick={handleShowMore}
            className="mt-1 ml-auto opacity-50 hover:opacity-75 active:opacity-75 transition-all ease-in-out duration-100"
          >
            {showingMore ? "show less" : "show more"}
          </button>
        </div>
      ) : (
        ""
      )} */}
    </div>
  )
}
export default AnimeComments
