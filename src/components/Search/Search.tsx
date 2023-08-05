import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { useSearchStore } from "../../store/searchStore"
import ajax from "../../service/backendAjax"

import { animeGenreResponse } from "../../types/anime.types"

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
          className="opacity-50 flex gap-1"
        >
          <span>filter</span>
          <span
            className={`${selectedGenres.length > 0 ? "text-sp-main" : ""}`}
          >
            ({selectedGenres.length})
          </span>
        </button>
        {selectedGenres.length > 0 ||
        sort !== "asc" ||
        orderBy !== "popularity" ||
        status !== null ||
        rating !== null ? (
          <button
            onClick={handleClearFilters}
            className="hover:opacity-80 transition-all ease-in-out duration-200"
          >
            clear filters
          </button>
        ) : (
          ""
        )}
      </div>

      <div>
        {isFilterMenuOpen && !isLoading && !error ? (
          <>
            <GenreList genres={genres} />
            <SearchSelectList />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
export default Search
