import { useMutation, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { FullUserType, FullUserResponse } from "../../types/user.types"

import { useAuthStore } from "../../store/authStore"
import { useSettingsStore } from "../../store/settingsStore"

import Button from "../UI/Button"
import { ReactComponent as LinkIcon } from "../../assets/icons/up-right-from-square-solid.svg"
import { ReactComponent as Trash } from "../../assets/icons/trash-can-solid.svg"

interface Props extends FullUserType {
  className?: string
}

const UserRow = ({ _id, username, email, accountType }: Props) => {
  const queryClient = useQueryClient()

  const [token] = useAuthStore((state) => [state.token])
  const [theme] = useSettingsStore((state) => [state.theme])

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
      <td className="p-3">{_id}</td>
      <td className="p-3">{email}</td>
      <td className="p-3">{username}</td>
      <td className="p-3">{accountType}</td>
      <td className="p-3 text-red-500 flex flex-row gap-2 border-l-2 border-sp-white">
        <Button
          onClick={handleDelete}
          disabled={accountType === "Admin"}
          className="px-1 bg-transparent text-red-500 font-semibold"
        >
          <Trash
            height={24}
            width={24}
            fill={"rgb(239,68,68)"}
          />
        </Button>
        <motion.div
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0.8 }}
        >
          <Link to={`../profile/${username}`}>
            <LinkIcon
              height={24}
              width={24}
              fill={theme === "dark" ? "white" : "black"}
            />
          </Link>
        </motion.div>
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
