import { FullUserType } from "../../types/user.types"

import UserRow from "./UserRow"

interface Props {
  data: FullUserType[]
}

const UserList = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto border-gray-200 dark:bg-sp-gray rounded-md border-2 p-2">
      <table className="divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">email</th>
            <th className="text-left p-2">username</th>
            <th className="text-left p-2">status</th>
            <th className="text-left p-2">actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
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
    </div>
  )
}
export default UserList
