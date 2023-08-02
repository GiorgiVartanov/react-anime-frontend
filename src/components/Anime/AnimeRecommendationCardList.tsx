import { AnimeRecommendation } from "../../types/anime.types"

import AnimeCardList from "./AnimeCardList"

interface Props {
  data: AnimeRecommendation
}

const AnimeRecommendationCardList = ({ data }: Props) => {
  return (
    <div>
      <AnimeCardList
        data={data.data.slice(0, 12).map((item) => ({
          ...item.entry,
        }))}
      />
    </div>
  )
}
export default AnimeRecommendationCardList
