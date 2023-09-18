import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ajax from "../../service/backendAjax"
import { motion } from "framer-motion"

import { CommentType } from "../../types/comment.types"

import { useAuthStore } from "../../store/authStore"

import UserIcon from "../Person/UserIcon"
import CommentUpvotes from "./CommentUpvotes"
import CommentAdminActions from "./CommentAdminActions"

export interface Props {
  comment: CommentType
  token: string | null
  isLoggedIn: boolean
  animeId: string
}

// renders passed comment
const Comment = ({ comment, token, isLoggedIn, animeId }: Props) => {
  const queryClient = useQueryClient()

  const { id, hasLiked, author, text, liked, disliked, posted } = comment

  const [accountType] = useAuthStore((state) => [state.accountType])

  // upvotes a comment
  const upvote = useMutation({
    mutationFn: () => {
      return ajax.post(
        `/comments/vote`,
        { id: id, voteType: "upvote" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    mutationKey: ["comment", animeId, id],
    onMutate: async () => {
      const comments =
        queryClient.getQueryData<{ data: CommentType[] }>([
          "anime-comments",
          animeId,
        ])?.data || []

      // optimistically updating comment's upvotes
      const newComments = comments.map((comment) => {
        if (comment.id === id) {
          if (comment.hasLiked === "upvote") {
            comment.liked = liked - 1
            comment.hasLiked = null
          } else if (comment.hasLiked === "downvote") {
            comment.liked = liked + 2
            comment.hasLiked = "upvote"
          } else {
            comment.liked = liked + 1
            comment.hasLiked = "upvote"
          }
        }

        return comment
      })

      queryClient.setQueryData(["anime-comments", animeId], {
        data: newComments,
      })
    },
    onError: async (error) => {
      toast.error(`something went wrong, try again latter`)
      console.log(error)

      const comments =
        queryClient.getQueryData<{ data: CommentType[] }>([
          "anime-comments",
          animeId,
        ])?.data || []

      const newComments = comments.map((comment) => {
        if (comment.id === id) {
          if (comment.hasLiked === "upvote") {
            comment.liked = liked - 1
            comment.hasLiked = null
          } else if (comment.hasLiked === "downvote") {
            comment.liked = liked - 1
            comment.hasLiked = "downvote"
          }
        }

        return comment
      })

      queryClient.setQueryData(["anime-comments", animeId], {
        data: newComments,
      })
    },
  })

  // downvotes a comment
  const downvote = useMutation({
    mutationFn: () => {
      return ajax.post(
        `/comments/vote`,
        { id: id, voteType: "downvote" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    mutationKey: ["comment", animeId, id],
    onMutate: async () => {
      const comments =
        queryClient.getQueryData<{ data: CommentType[] }>([
          "anime-comments",
          animeId,
        ])?.data || []

      const newComments = comments.map((comment) => {
        if (comment.id === id) {
          if (comment.hasLiked === "downvote") {
            comment.disliked = disliked - 1
            comment.hasLiked = null
          } else if (comment.hasLiked === "upvote") {
            comment.disliked = disliked + 2
            comment.hasLiked = "downvote"
          } else {
            comment.disliked = disliked + 1
            comment.hasLiked = "downvote"
          }
        }

        return comment
      })

      queryClient.setQueryData(["anime-comments", animeId], {
        data: newComments,
      })
    },
    onError: async (error) => {
      toast.error(`something went wrong, try again latter`)
      console.log(error)

      const comments =
        queryClient.getQueryData<{ data: CommentType[] }>([
          "anime-comments",
          animeId,
        ])?.data || []

      const newComments = comments.map((comment) => {
        if (comment.id === id) {
          if (comment.hasLiked === "downvote") {
            comment.liked = liked + 1
            comment.hasLiked = null
          } else if (comment.hasLiked === "upvote") {
            comment.liked = liked + 1
            comment.hasLiked = "upvote"
          }
        }

        return comment
      })

      queryClient.setQueryData(["anime-comments", animeId], {
        data: newComments,
      })
    },
  })

  const handleLike = () => {
    // will implement debouncing latter

    if (!isLoggedIn) {
      toast.error(ToastContent)
      return
    }

    upvote.mutate()
  }

  const handleDislike = () => {
    // will implement debouncing latter

    if (!isLoggedIn) {
      toast.error(ToastContent)
      return
    }

    downvote.mutate()
  }

  return (
    <motion.div className="text-md">
      <div className="flex flex-row gap-4 mb-1 mt-2 py-1">
        <UserIcon username={author} />
        <p className="text-sm opacity-25 leading-8">{posted}</p>
        {accountType === "Admin" ? (
          <CommentAdminActions
            commentId={id}
            username={author}
            animeId={animeId}
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-row">
        <CommentUpvotes
          handleLike={handleLike}
          handleDislike={handleDislike}
          hasLiked={hasLiked}
          amount={liked - disliked}
          liked={false}
        />
        <div className="bg-white dark:bg-sp-black px-2 py-1 text-sp-black dark:text-slate-300 shadow-sm rounded-tb-lg w-full">
          <p className="pb-4 pt-1">{text}</p>
        </div>
      </div>
    </motion.div>
  )
}
export default Comment

function ToastContent() {
  return <Link to="/register">you need to register, to be able to vote</Link>
}
