import { useMutation, useQueryClient } from "@tanstack/react-query"
import backendAjax from "../../service/backendAjax"
import { toast } from "react-toastify"

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
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  return (
    <tr className="">
      <td className="p-3">{_id}</td>
      <td className="p-3">{email}</td>
      <td className="p-3">{username}</td>
      <td className="p-3">{accountType}</td>
      <td className="p-3 text-red-500">
        <button onClick={handleDelete}>delete</button>
      </td>
    </tr>
  )
}
export default UserRow
