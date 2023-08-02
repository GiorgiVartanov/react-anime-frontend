import { AnimeData, AnimeResponse } from "../../types/anime.types"
import { Props as AnimeCardProps } from "./AnimeCard"

import AnimeCard from "./AnimeCard"

interface Props {
  data: AnimeCardProps[] | AnimeData[]
}

const AnimeCardList = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-1 xss:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-around">
      {data?.map((anime) => (
        <AnimeCard
          key={anime.mal_id}
          mal_id={anime.mal_id}
          url={anime.url}
          images={anime.images}
          title={anime.title}
        />
      ))}
    </div>
  )
}
export default AnimeCardList
