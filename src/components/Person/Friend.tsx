import { Link } from "react-router-dom"

import UserIcon from "./UserIcon"

interface Props {
  username: string
}

const Friend = ({ username }: Props) => {
  return (
    <Link
      to={`../profile/${username}`}
      className="flex gap-2 text-center items-center"
    >
      <UserIcon
        whileTap={{ scale: 0.95 }}
        whileHover={{ opacity: 0.8 }}
        username={username}
      />
    </Link>
  )
}
export default Friend
