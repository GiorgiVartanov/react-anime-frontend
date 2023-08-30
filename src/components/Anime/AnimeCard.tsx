import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { AnimeType } from "../../types/anime.types"

import { useSettingsStore } from "../../store/settingsStore"

import { ReactComponent as StarSolid } from "../../assets/icons/star-solid.svg"

const item = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export interface Props extends AnimeType {
  isFavorite: boolean
  className?: string
}

const AnimeCard = ({ mal_id, images, isFavorite, title, className }: Props) => {
  const [theme] = useSettingsStore((state) => [state.theme])

  return (
    <motion.li
      variants={item}
      className={`list-none  ${className}`}
    >
      <Link
        to={`../../anime/${mal_id}/`}
        className={`block group relative`}
      >
        {isFavorite ? (
          <motion.div
            initial={{ opacity: 0, y: "-5%", x: "-5%" }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            className="absolute z-20 dark:bg-sp-black bg-sp-white p-0.5 shadow-md rounded-br-xl"
          >
            <StarSolid
              height={24}
              width={24}
              fill={`${theme === "dark" ? "#e6eaee" : "#121212"}`}
            />
          </motion.div>
        ) : (
          ""
        )}
        <div className="aspect-w-2 aspect-h-3 relative">
          <motion.img
            // initial={{ opacity: 0 }}
            // whileInView={{ opacity: 1 }}
            whileHover={{ opacity: 0.85 }}
            src={images?.webp?.large_image_url}
            alt={title}
            loading="lazy"
            className="w-full h-full shadow-md transition-all ease-in-out duration-300 object-cover"
          />
        </div>
        <p className="text-sm whitespace-nowrap overflow-hidden transition-all ease-in-out duration-200 truncate text-sp-black dark:text-white ">
          {title}
        </p>
      </Link>
    </motion.li>
  )
}
export default AnimeCard
