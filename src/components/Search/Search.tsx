import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { useSearchStore } from "../../store/searchStore"

import { animeGenreResponse } from "../../types/anime.types"

import SearchBar from "./SearchBar"
import GenreList from "./GenreList"
import SearchSelectList from "./SearchSelectList"

const baseURL = import.meta.env.VITE_API_URL

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -25 },
}

const Search = () => {
  const [
    text,
    changeText,
    genres,
    selectedGenres,
    setAnimeGenres,
    selectGenre,
    unSelectGenre,
  ] = useSearchStore((state) => [
    state.text,
    state.changeText,
    state.genres,
    state.selectedGenres,
    state.setAnimeGenres,
    state.selectGenre,
    state.unSelectGenre,
  ])

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false)

  // function that fetches genres from the API (will change it later, so it fetches genres from the backend, because of some NSFW genres)
  const fetchAnime = (): Promise<animeGenreResponse> =>
    axios.get(`${baseURL}/genres/anime`).then((response) => response.data)

  // gets genres from API
  const { isLoading, error, data } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchAnime,
    staleTime: 1000000,
  })

  useEffect(() => {
    if (!data) return
    setAnimeGenres(data)
  }, [data, setAnimeGenres])

  const handleFilterMenuOpen = () => {
    setIsFilterMenuOpen((prevState) => !prevState)
  }

  return (
    <div className="mt-5 mb-8">
      <SearchBar
        value={text}
        handleTextChange={changeText}
      />
      <button
        onClick={handleFilterMenuOpen}
        className="my-2 flex gap-1 mx-auto opacity-50"
      >
        <span>filter</span>
        <span className={`${selectedGenres.length > 0 ? "text-sp-main" : ""}`}>
          ({selectedGenres.length})
        </span>
      </button>
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
