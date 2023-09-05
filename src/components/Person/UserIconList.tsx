import UserIcon from "./UserIcon"

interface Props {
  users: string[]
  emptyMessage: string
  className?: string
}

const UserIconList = ({ users, emptyMessage, className = "" }: Props) => {
  if (!users || users.length <= 0) return <div>{emptyMessage}</div>

  return (
    <div className={`flex flex-wrap gap-4 mt-2 mb-4 ${className}`}>
      {users.map((friend) => (
        <UserIcon
          key={friend}
          username={friend}
        />
      ))}
    </div>
  )
}
export default UserIconList
