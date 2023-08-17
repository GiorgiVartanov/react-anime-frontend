import { motion, AnimatePresence } from "framer-motion"

import {
  AnimeType,
  AnimeResponse,
  ShortAnimeType,
} from "../../types/anime.types"
import { FavoriteAnime } from "../../types/user.types"
import { Props as AnimeCardProps } from "./AnimeCard"

import AnimeCard from "./AnimeCard"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}

interface Props {
  data:
    | AnimeCardProps[][]
    | AnimeType[][]
    | ShortAnimeType[][]
    | FavoriteAnime[][]
}

const AnimeCardList = ({ data = [] }: Props) => {
  return (
    <div className="grid grid-cols-1 xss:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-center ">
      {data?.map((animePage, index) => (
        <motion.ul
          key={index}
          variants={container}
          initial="hidden"
          animate="visible"
          className="contents"
        >
          {animePage?.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              mal_id={Number(anime.mal_id)}
              images={anime.images}
              title={anime.title}
              className=""
            />
          ))}
        </motion.ul>
      ))}
    </div>
  )
}
export default AnimeCardList
