import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { AnimeType } from "../../types/anime.types"

const item = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export interface Props extends AnimeType {
  className?: string
}

const AnimeCard = ({ mal_id, images, title, className }: Props) => {
  return (
    <motion.li
      variants={item}
      className={`list-none ${className}`}
    >
      <Link
        to={`../../anime/${mal_id}/`}
        className={`block group `}
      >
        <div className="aspect-w-2 aspect-h-3">
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
