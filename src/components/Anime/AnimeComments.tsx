import { useQuery } from "@tanstack/react-query"
// import { useState } from "react"
import { useNavigate } from "react-router-dom"
import backendAjax from "../../service/backendAjax"
import { toast } from "react-toastify"

import { CommentType } from "../../types/comment.types"

import { useAuthStore } from "../../store/authStore"

import CommentList from "../../components/Comments/CommentList"

interface Props {
  id: string
}

const AnimeComments = ({ id }: Props) => {
  const navigate = useNavigate()

  // const [showingMore, setShowingMore] = useState<boolean>(false)

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
        const response = await backendAjax.get(`comments/${id}/logged`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        data = response.data
      } else {
        const response = await backendAjax.get(`comments/${id}`)

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

  // const handleShowMore = () => {
  //   setShowingMore((prevState) => !prevState)
  // }

  if (isLoading) return <div>Loading...</div>

  if (error || !data) return <div>Something went wrong</div>

  const showPerPage = 8

  return (
    <section>
      <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
        Comments
      </h2>
      <div className="h-0.5 w-full bg-sp-main mb-1"></div>
      <CommentList
        comments={data.data}
        showPerPage={showPerPage}
        animeId={id}
      />
    </section>
  )
}
export default AnimeComments
