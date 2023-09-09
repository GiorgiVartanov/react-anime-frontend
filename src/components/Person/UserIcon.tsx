import { motion } from "framer-motion"
import { useCallback } from "react"
import { Link } from "react-router-dom"
import backendAjax from "../../service/backendAjax"
import { useQuery } from "@tanstack/react-query"

import generateColor from "../../util/generateColor"
import generateNegativeColor from "../../util/generateNegativeColor"

interface Props {
  username: string | null
  [x: string]: any
}

// renders icon with username's first character
const UserIcon = ({ username, ...rest }: Props) => {
  const fetchUserIcon = async () => {
    const result = await backendAjax.get(`/user/profilepicture/${username}`)

    return result.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchUserIcon,
    queryKey: ["profile-picture", username],
  })

  const getColor = useCallback((username: string) => {
    return generateColor(username)
  }, [])

  const getNegativeColor = useCallback((color: string) => {
    return generateNegativeColor(color)
  }, [])

  if (!username) return <></>

  const color = getColor(username)
  const negativeColor = getNegativeColor(color)

  const renderProfilePictureWithColor = () => {
    return (
      <div
        style={{
          backgroundColor: color,
          color: negativeColor,
        }}
        className="bg-sp-main font-bold rounded-full text-center leading-8 h-8 w-8 no-underline select-none"
      >
        <p className="font-extrabold">{username[0].toUpperCase()}</p>
      </div>
    )
  }

  const renderProfilePicture = () => {
    if (isLoading || error || !data?.data)
      return (
        <div className="bg-sp-black dark:bg-sp-white font-bold rounded-full text-center leading-8 h-8 w-8 no-underline select-none"></div>
      )

    const image = new Image()
    image.src = `data:image/png;base64,${data.data}`

    return (
      <img
        alt={username}
        src={image.src}
        className="rounded-full h-8 w-8"
      />
    )
  }

  return (
    <Link
      to={`../profile/${username}`}
      className="flex gap-2 text-center items-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ opacity: 0.7 }}
        className="flex gap-2 text-center items-center"
        {...rest}
      >
        {!data?.data ? renderProfilePictureWithColor() : renderProfilePicture()}
        <p className="font-semibold">{username}</p>
      </motion.div>
    </Link>
  )
}
export default UserIcon
