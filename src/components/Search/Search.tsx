import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { useSearchStore } from "../../store/searchStore"
import ajax from "../../service/backendAjax"

import { animeGenreResponse } from "../../types/anime.types"

import { ReactComponent as Arrow } from "../../assets/icons/angle-up-solid.svg"
import SearchBar from "./SearchBar"
import GenreList from "./GenreList"
import SearchSelectList from "./SearchSelectList"

const baseURL = import.meta.env.VITE_API_URL

const Search = () => {
  const [
    text,
    changeText,
    genres,
    selectedGenres,
    setAnimeGenres,
    selectGenre,
    unSelectGenre,
    clearFilters,
    sort,
    orderBy,
    status,
    rating,
    getAmountOfFilters,
  ] = useSearchStore((state) => [
    state.text,
    state.changeText,
    state.genres,
    state.selectedGenres,
    state.setAnimeGenres,
    state.selectGenre,
    state.unSelectGenre,
    state.clearFilters,
    state.sort,
    state.orderBy,
    state.status,
    state.rating,
    state.getAmountOfFilters,
  ])

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false)

  // function that fetches genres from the API (will change it later, so it fetches genres from the backend, because of some NSFW genres)
  const fetchGenres = (): Promise<animeGenreResponse> =>
    ajax.get(`anime/genres`).then((response) => response.data)

  // gets genres from API
  const { isLoading, error, data } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000000,
  })

  useEffect(() => {
    if (!data) return
    setAnimeGenres(data)
  }, [data, setAnimeGenres])

  const handleFilterMenuOpen = () => {
    setIsFilterMenuOpen((prevState) => !prevState)
  }

  const handleClearFilters = () => {
    clearFilters()
  }

  return (
    <div className="mt-5 mb-8">
      <SearchBar
        value={text}
        handleTextChange={changeText}
      />
      <div className="my-2 flex gap-6 mx-auto w-fit">
        <button
          onClick={handleFilterMenuOpen}
          className="text-sp-light hover:opacity-80 transition-all ease-in-out duration-200 flex gap-1"
        >
          <span>filter</span>
          <div className="h-full flex flex-col justify-center">
            <Arrow
              height={18}
              width={18}
              fill={getAmountOfFilters() > 0 ? "#e91e63" : "#5c6369"}
              className={`transition-all ease-in-out duration-200 ${
                isFilterMenuOpen ? "-rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </button>
        {getAmountOfFilters() > 0 ? (
          <button
            onClick={handleClearFilters}
            className="text-sp-light hover:opacity-80 transition-all ease-in-out duration-200"
          >
            clear filters
          </button>
        ) : (
          ""
        )}
      </div>

      <div>
        {isFilterMenuOpen && !isLoading && !error ? (
          <div className="animate-slide relative">
            <GenreList genres={genres} />
            <SearchSelectList />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
export default Search
