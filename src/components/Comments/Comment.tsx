import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import { CommentType } from "../../types/comment.types"

import ajax from "../../service/ajax"

import UserIcon from "../Person/UserIcon"
import Button from "../UI/Button"
import CommentUpvotes from "./CommentUpvotes"
import { ReactComponent as Upvote } from "../../assets/icons/upvote.svg"

export interface Props {
  comment: CommentType
  token: string | null
  isLoggedIn: boolean
  animeId: string
}

// renders single comment
const Comment = ({ comment, token, isLoggedIn, animeId }: Props) => {
  const queryClient = useQueryClient()

  const { id, hasLiked, author, text, liked, disliked, posted, wasUpdated } =
    comment

  const [canVote, setCanVote] = useState<boolean>(true)

  // upvotes a comment
  const upvote = useMutation({
    mutationFn: () => {
      setCanVote(false)

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
    onSettled: async (res) => {
      // will do latter
    },
  })

  // downvotes a comment
  const downvote = useMutation({
    mutationFn: () => {
      setCanVote(false)

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
    onSettled: async (res) => {
      // will do latter
    },
  })

  const handleLike = () => {
    // will implement debouncing latter

    if (!isLoggedIn) return

    upvote.mutate()
  }

  const handleDislike = () => {
    // will implement debouncing latter

    if (!isLoggedIn) return

    downvote.mutate()
  }

  return (
    <div className="text-md">
      <div className="flex flex-row gap-4 mb-1 mt-2 px-1 py-1">
        <Link
          to={`../../profile/${author}`}
          className="w-fit hover:opacity-90 transition-all ease-in-out duration-200 shadow-sm flex gap-2"
        >
          <UserIcon username={author} />
          <p className="leading-8 ml-0.5">{author}</p>
        </Link>
        <p className="text-sm opacity-25 leading-8">{posted}</p>
      </div>
      <div className="flex flex-row">
        <CommentUpvotes
          handleLike={handleLike}
          handleDislike={handleDislike}
          hasLiked={hasLiked}
          amount={liked - disliked}
          canVote={canVote}
          liked={false}
        />
        <div className="bg-sp-black px-2 py-1 text-slate-300 shadow-sm rounded-tb-lg w-full">
          <p className="pb-4 pt-1">{text}</p>
        </div>
      </div>
    </div>
  )
}
export default Comment
