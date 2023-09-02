import { useState } from "react"
import { CommentType } from "../../types/comment.types"

import { useAuthStore } from "../../store/authStore"

import Comment from "./Comment"
import NewComment from "./NewComment"

interface Props {
  comments: CommentType[]
  showPerPage: number
  animeId: string
}

// renders list of a comments
const CommentList = ({ comments, showPerPage, animeId }: Props) => {
  const [page, setPage] = useState(1)

  const [isLoggedIn, token] = useAuthStore((state) => [
    state.isLoggedIn,
    state.token,
  ])

  const handleAddPage = () => {
    setPage((prevState) => prevState + 1)
  }

  return (
    <div className="flex flex-col gap-2">
      <NewComment />
      {comments?.slice(0, page * showPerPage).map((comment) => (
        <Comment
          comment={comment}
          token={token}
          isLoggedIn={isLoggedIn}
          animeId={animeId}
          key={comment.id}
        />
      ))}
      {comments?.length > showPerPage ? (
        <button
          onClick={handleAddPage}
          className="opacity-20 hover:opacity-30 mt-3 mb-2 py-1 px-6 w-fit mx-auto transition-all ease-in-out duration-100"
        >
          show more
        </button>
      ) : (
        ""
      )}
    </div>
  )
}
export default CommentList
