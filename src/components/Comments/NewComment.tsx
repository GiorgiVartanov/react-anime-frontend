import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { KeyboardEvent } from "react"
import { toast } from "react-toastify"

import { useAuthStore } from "../../store/authStore"
import ajax from "../../service/ajax"

import { CommentType } from "../../types/comment.types"

// renders input field for a new comment
const NewComment = () => {
  const queryClient = useQueryClient()

  // gets user data from the store
  const [username, isLoggedIn, token] = useAuthStore((state) => [
    state.username,
    state.isLoggedIn,
    state.token,
  ])
  const { id } = useParams()

  const [text, setText] = useState<string>("")

  const mutation = useMutation({
    mutationFn: ({ text, animeId }: { text: string; animeId: string }) => {
      return ajax.post(
        "/comments",
        { text, animeId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    mutationKey: ["anime-comments", id],
    onMutate: async () => {
      const previousComments =
        queryClient.getQueryData<{ data: CommentType[] }>([
          "anime-comments",
          id,
        ])?.data || []

      const optimisticallyAddedComment = {
        id: Number(new Date()), // it will be changed on actual id in onSettled
        author: username,
        text: text,
        liked: 0,
        disliked: 0,
        posted: "now",
        wasUpdated: false,
      }

      console.log(optimisticallyAddedComment)

      await queryClient.cancelQueries(["anime-comments", id])

      queryClient.setQueryData(["anime-comments", id], {
        data: [optimisticallyAddedComment, ...previousComments],
      })

      setText("")
    },
    onSettled: async (newComment) => {
      const previousComments =
        queryClient.getQueryData<{ data: CommentType[] }>([
          "anime-comments",
          id,
        ])?.data || []

      previousComments.shift() // removing first element from array, the one that was optimistically added in onMutate

      const commentToAdd = newComment?.data

      await queryClient.cancelQueries(["anime-comments", id])

      console.log(commentToAdd)

      queryClient.setQueryData(["anime-comments", id], {
        data: [commentToAdd, ...previousComments],
      })
    },
  })

  const postComment = () => {
    if (!isLoggedIn) {
      toast.error(ToastLink) // shows error message, by clicking on it user will be redirected to login page

      return
    }

    if (!text || text === "") {
      toast.error("you can't post empty comment")
      return
    }

    if (!id) return

    mutation.mutate({ text: text, animeId: id })

    // scrolls to the bottom of a page
    // setTimeout(() => {
    //   window.scrollTo({
    //     top: document.documentElement.scrollHeight,
    //     behavior: "smooth",
    //   })
    // }, 100)
  }

  // sends a comment
  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    postComment()
  }

  // sends a comment on enter key press
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.shiftKey) return

    postComment()
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <form
      onSubmit={handleComment}
      className=""
    >
      <textarea
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        className="p-2 outline-none transition-all ease-in-out delay-50 duration-100 resize-none w-full bg-sp-black overflow-wrap"
      />
      <button className="bg-sp-black px-2 py-1 mt-1 shadow-sm hover:shadow-md ease-in-out duration-100">
        comment
      </button>
    </form>
  )
}
export default NewComment

function ToastLink() {
  return <Link to="../login">you need to log in to write a comment</Link>
}
