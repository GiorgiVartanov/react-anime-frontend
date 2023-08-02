import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { useSearchStore } from "../store/searchStore"

import { AnimeResponse } from "../types/anime.types"

import AnimeCardList from "../components/Anime/AnimeCardList"
import SearchComponent from "../components/Search/Search"
import SkeletonAnimeCardList from "../components/Anime/Skeleton/SkeletonAnimeCardList"

const baseURL = import.meta.env.VITE_API_URL

// renders search bar, genre select buttons and sorting type
const Search = () => {
  const [
    limit,
    page,
    categories,
    selectedGenres,
    season,
    seasonYear,
    sort,
    orderBy,
    text,
  ] = useSearchStore((state) => [
    state.limit,
    state.page,
    state.categories,
    state.selectedGenres,
    state.season,
    state.seasonYear,
    state.sort,
    state.orderBy,
    state.text,
  ])

  // function that fetches anime from API
  const fetchAnime = (): Promise<AnimeResponse> =>
    axios
      .get(
        `${baseURL}/anime?limit=${limit}&sfw=true&page=${page}&order_by=${orderBy}&sort=${sort}&genres=${selectedGenres.join()}&q=${text}&page=1`
      )
      .then((response) => response.data)

  // gets data from API
  const { isLoading, error, data } = useQuery({
    queryKey: ["anime", limit, page, sort, selectedGenres.join(), text],
    queryFn: fetchAnime,
    staleTime: 1000000,
  })

  // function that renders anime cards
  const renderCardList = () => {
    // is the data is still pending it will render skeleton component
    if (isLoading) return <SkeletonAnimeCardList amount={20} />

    // it will show error message if there is an error
    if (error || !data) return <div>something went wrong</div>

    return <AnimeCardList data={data.data} />
  }

  return (
    <div className="mx-auto max-w-7xl w-full p-2 h-full">
      <SearchComponent />
      {renderCardList()}
    </div>
  )
}

export default Search
