import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import backendAjax from "../../service/backendAjax"

import { FullUserResponse } from "../../types/user.types"
import { CommentType } from "../../types/comment.types"

import { useSettingsStore } from "../../store/settingsStore"
import { useAuthStore } from "../../store/authStore"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import { ReactComponent as Gear } from "../../assets/icons/gear-solid.svg"
import Button from "../UI/Button"

interface Props {
  username: string
  commentId: string
  animeId: string
}

const CommentAdminActions = ({ username, commentId, animeId }: Props) => {
  const queryClient = useQueryClient()

  const ref = useRef<HTMLDivElement>(null)

  const [theme] = useSettingsStore((state) => [state.theme])
  const [token] = useAuthStore((state) => [state.token])

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const deleteComment = () => {
    const response = backendAjax.delete(`comments/delete/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response
  }

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    mutationKey: ["comment", commentId],
    onSuccess: () => {
      toast.success(`successfully deleted comment with id ${commentId}`)
    },
    onError: (error) => {
      toast.error(
        `something went wrong while deleting comment with id ${commentId}, see browser console for more detailed information`
      )
      console.log(error)
    },
    onMutate: async () => {
      const previousComments =
        queryClient.getQueryData<{ data: CommentType[] }>([
          "anime-comments",
          animeId,
        ])?.data || []

      const updatedComments = previousComments.filter(
        (comment) => comment.id !== commentId
      )

      await queryClient.cancelQueries(["anime-comments", animeId])

      queryClient.setQueryData(["anime-comments", animeId], {
        data: updatedComments,
      })
    },
  })

  const deleteUser = () => {
    // if (accountStatus !== "Admin") return

    const response = backendAjax.delete(`user/delete/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response
  }

  const deleteUserMutation = useMutation({
    mutationFn: () => {
      return deleteUser()
    },
    mutationKey: ["users"],
    onMutate: () => {
      const users = queryClient.getQueryData<FullUserResponse>([
        "users for dashboard",
      ])?.data

      if (!users) return

      const filteredUsers = users.filter((user) => user.username !== username)

      queryClient.setQueryData(["users for dashboard"], {
        data: filteredUsers,
      })
    },
    onSuccess: () => {
      toast.success(`successfully deleted user with username ${username}`)
    },
    onError: (error) => {
      toast.success(
        `something went wrong while deleting user with username ${username}, see browser console for more detailed information`
      )
      console.log(error)
    },
  })

  const handleOnClickOutside = () => {
    setIsMenuOpen(false)
  }

  const handleOnClick = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  const handleRemoveComment = () => {
    deleteCommentMutation.mutate()
  }

  const handleBanUser = () => {
    deleteUserMutation.mutate()
  }

  useOnClickOutside(ref, handleOnClickOutside)

  return (
    <div
      ref={ref}
      className="text-sm flex gap-2 relative"
    >
      <Button
        onClick={handleOnClick}
        className="bg-transparent"
      >
        <Gear
          width={24}
          height={24}
          fill={`${theme === "dark" ? "#e6eaee" : "#121212"}`}
          className={`ease-in-out duration-200 ${
            isMenuOpen ? "-rotate-90 opacity-30" : "rotate-0 opacity-100"
          }`}
        />
      </Button>
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, x: -50, y: -25, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: -50,
              y: -25,
              scale: 0.5,
              transition: { duration: 0.1 },
            }}
            className="text-sm flex gap-2 absolute left-8 top-8 bg-sp-white dark:bg-sp-black p-1 shadow-xl"
          >
            <Button
              onClick={handleRemoveComment}
              className="py-[0.25rem] whitespace-nowrap"
            >
              Remove Comment
            </Button>
            <Button
              onClick={handleBanUser}
              className="py-[0.25rem] whitespace-nowrap"
            >
              Ban
            </Button>
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  )
}
export default CommentAdminActions
