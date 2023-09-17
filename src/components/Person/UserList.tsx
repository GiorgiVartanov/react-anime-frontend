import { motion } from "framer-motion"

import { FullUserType } from "../../types/user.types"

import UserRow from "./UserRow"

interface Props {
  data: FullUserType[]
  className?: string
}

const UserList = ({ data, className }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`overflow-x-auto border-gray-200 dark:bg-sp-gray rounded-md border-2 p-2 ${className}`}
    >
      <table className="divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">email</th>
            <th className="text-left p-2">username</th>
            <th className="text-left p-2">status</th>
            <th className="text-right p-2">actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 overflow-x-auto">
          {data?.map((user) => (
            <UserRow
              key={user._id}
              _id={user._id}
              username={user.username}
              email={user.email}
              accountType={user.accountType}
            />
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
export default UserList
