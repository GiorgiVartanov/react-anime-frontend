import { motion } from "framer-motion"
import backendAjax from "../../service/backendAjax"
import { useQuery } from "@tanstack/react-query"

import { AnimeType } from "../../types/anime.types"
import { FavoriteAnimeResponse } from "../../types/user.types"

import { useAuthStore } from "../../store/authStore"

import AnimeCard from "./AnimeCard"
import Loading from "../UI/Loading"

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.05,
    },
  },
}

interface Props {
  data: AnimeType[][]
}

// list of AnimeCard components
const AnimeCardList = ({ data = [] }: Props) => {
  const [username] = useAuthStore((state) => [state.username])

  // function to fetch favorite anime (anime that are favorite will have star sign on a top left corner)
  const fetchFavoriteAnime =
    async (): Promise<FavoriteAnimeResponse | null> => {
      if (!username) return null

      const response = await backendAjax.get(`favorite/${username}`)
      return response.data
    }

  // fetches favorite anime
  const {
    data: favoriteAnimeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorite-anime", username],
    queryFn: fetchFavoriteAnime,
    staleTime: 1000000,
  })

  // if (isLoading) return <></>

  if (error) {
    console.log(error)
    return <>Something went wrong</>
  }

  return (
    <div className="grid grid-cols-1 xss:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-center">
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
              isFavorite={
                favoriteAnimeData?.data?.filter(
                  (favoriteAnime) => favoriteAnime.mal_id == anime.mal_id
                ).length > 0
              }
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
