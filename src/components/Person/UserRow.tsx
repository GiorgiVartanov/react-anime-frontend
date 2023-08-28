import { useMutation, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import { FullUserType, FullUserResponse } from "../../types/user.types"

import { useAuthStore } from "../../store/authStore"

import Button from "../UI/Button"

interface Props extends FullUserType {
  className?: string
}

const UserRow = ({ _id, username, email, accountType }: Props) => {
  const queryClient = useQueryClient()

  const [token] = useAuthStore((state) => [state.token])

  // delete user
  const deleteUser = () => {
    const response = backendAjax.delete(`user/delete/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response
  }

  const mutation = useMutation({
    mutationFn: () => {
      return deleteUser()
    },
    mutationKey: ["users"],
    onMutate: () => {
      const users = queryClient.getQueryData<FullUserResponse>([
        "users for dashboard",
      ])?.data

      if (!users) return

      const filteredUsers = users.filter((user) => user._id !== _id)

      queryClient.setQueryData(["users for dashboard"], {
        data: filteredUsers,
      })
    },
    onSuccess: () => {
      toast.success(`successfully deleted user with id ${_id}`)
    },
    onError: (error) => {
      toast.error(
        `something went wrong while deleting user with id ${_id}, see browser console for more detailed information`
      )
      console.log(error)
    },
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  // promote user
  const promoteUser = () => {
    const response = backendAjax.patch(
      `user/promote/${_id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    return response
  }

  const promoteUserMutation = useMutation({
    mutationFn: promoteUser,
    mutationKey: ["promote user", _id],
    onMutate: () => {
      const users = queryClient.getQueryData<FullUserResponse>([
        "users for dashboard",
      ])?.data

      if (!users) return

      const updatedUsers = users.map((user) => {
        if (user._id === _id)
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            accountType: "Admin",
          }
        return user
      })

      queryClient.setQueryData(["users for dashboard"], {
        data: updatedUsers,
      })
    },
    onSuccess: () => {
      toast.success(`successfully promoted user with id ${_id}`)
    },
    onError: (error) => {
      toast.error(
        `something went wrong while promoting user with id ${_id}, see browser console for more detailed information`
      )
      console.log(error)
    },
  })

  const handlePromote = () => {
    promoteUserMutation.mutate()
  }

  // demote user
  const demoteUser = () => {
    const response = backendAjax.patch(
      `user/demote/${_id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    return response
  }

  const demoteUserMutation = useMutation({
    mutationFn: demoteUser,
    mutationKey: ["demote user", _id],
    onMutate: () => {
      const users = queryClient.getQueryData<FullUserResponse>([
        "users for dashboard",
      ])?.data

      if (!users) return

      const updatedUsers = users.map((user) => {
        if (user._id === _id)
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            accountType: "User",
          }
        return user
      })

      queryClient.setQueryData(["users for dashboard"], {
        data: updatedUsers,
      })
    },
    onSuccess: () => {
      toast.success(`successfully demoting user with id ${_id}`)
    },
    onError: (error) => {
      toast.error(
        `something went wrong while demoting user with id ${_id}, see browser console for more detailed information`
      )
      console.log(error)
    },
  })

  const handleDemote = () => {
    demoteUserMutation.mutate()
  }

  return (
    <tr className="">
      <td className="p-3">
        <Link to={`../profile/${username}`}>{_id}</Link>
      </td>
      <td className="p-3">
        <Link to={`../profile/${username}`}>{email}</Link>
      </td>
      <td className="p-3">
        <Link to={`../profile/${username}`}>{username}</Link>
      </td>
      <td className="p-3">{accountType}</td>
      <td className="p-3 text-red-500 flex flex-row gap-2">
        <Button
          onClick={handleDelete}
          disabled={accountType === "Admin"}
          className="px-1 bg-transparent text-red-500 font-semibold"
        >
          Delete
        </Button>
        {accountType === "User" ? (
          <Button
            onClick={handlePromote}
            className="bg-transparent text-green-500 font-semibold"
          >
            Promote
          </Button>
        ) : (
          <Button
            onClick={handleDemote}
            className="bg-transparent text-red-500 font-semibold"
          >
            Demote
          </Button>
        )}
      </td>
    </tr>
  )
}
export default UserRow
