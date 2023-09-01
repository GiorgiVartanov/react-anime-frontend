import { useQuery } from "@tanstack/react-query"
import apiAjax from "../../service/APIAjax"

import { AnimeResponse } from "../../types/anime.types"

import Loading from "../UI/Loading"
import AnimeCardList from "./AnimeCardList"

interface Props {
  query: string
  queryKey: any[]
}

const AnimeList = ({ query, queryKey }: Props) => {
  const fetchAnime = async (): Promise<AnimeResponse> => {
    const response = await apiAjax.get(query)

    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchAnime,
    queryKey: queryKey,
  })

  if (isLoading) return <Loading />

  if (error || !data) return <div>Something went wrong</div>

  return <AnimeCardList data={[data.data]} />
}
export default AnimeList
