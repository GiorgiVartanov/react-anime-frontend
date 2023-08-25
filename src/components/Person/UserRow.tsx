import { useMutation, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import { FullUserType, FullUserResponse } from "../../types/user.types"

import { useAuthStore } from "../../store/authStore"

interface Props extends FullUserType {
  className?: string
}

const UserRow = ({ _id, username, email, accountType }: Props) => {
  const queryClient = useQueryClient()

  const [token, accountStatus] = useAuthStore((state) => [
    state.token,
    state.accountType,
  ])

  const deleteUser = () => {
    // if (accountStatus !== "Admin") return

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
      toast.success(
        `something went wrong while deleting user with id ${_id}, see browser console for more detailed information`
      )
      console.log(error)
    },
  })

  const handleDelete = () => {
    mutation.mutate()
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
      <td className="p-3 text-red-500">
        <motion.button
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
        >
          delete
        </motion.button>
      </td>
    </tr>
  )
}
export default UserRow
