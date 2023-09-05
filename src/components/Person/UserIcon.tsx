import { motion } from "framer-motion"
import { useCallback } from "react"
import { Link } from "react-router-dom"

import generateColor from "../../util/generateColor"
import generateNegativeColor from "../../util/generateNegativeColor"

interface Props {
  username: string
  [x: string]: any
}

// renders icon with username's first character
const UserIcon = ({ username, ...rest }: Props) => {
  const getColor = useCallback((username: string) => {
    return generateColor(username)
  }, [])

  const getNegativeColor = useCallback((color: string) => {
    return generateNegativeColor(color)
  }, [])

  const color = getColor(username)
  const negativeColor = getNegativeColor(color)

  return (
    <Link
      to={`../profile/${username}`}
      className="flex gap-2 text-center items-center"
    >
      <motion.div
        whileHover={{ opacity: 0.7 }}
        className="flex gap-2 text-center items-center"
        {...rest}
      >
        <div
          style={{ backgroundColor: color, color: negativeColor }}
          className="bg-sp-main font-bold rounded-full text-center leading-8 h-8 w-8 no-underline select-none"
        >
          <p className="font-extrabold">{username[0].toUpperCase()}</p>
        </div>
        <p className="font-semibold">{username}</p>
      </motion.div>
    </Link>
  )
}
export default UserIcon
