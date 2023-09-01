import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"

import { useSearchStore } from "../../store/searchStore"
import backendAjax from "../../service/backendAjax"

import { animeGenreResponse } from "../../types/anime.types"

import { ReactComponent as Arrow } from "../../assets/icons/angle-up-solid.svg"
import SearchBar from "./SearchBar"
import GenreList from "./GenreList"
import SearchSelectList from "./SearchSelectList"

const Search = () => {
  const [
    text,
    changeText,
    genres,
    setAnimeGenres,
    clearFilters,
    getAmountOfFilters,
  ] = useSearchStore((state) => [
    state.text,
    state.changeText,
    state.genres,
    state.setAnimeGenres,
    state.clearFilters,
    state.getAmountOfFilters,
  ])

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false)

  // function that fetches genres from the API (will change it later, so it fetches genres from the backend, because of some NSFW genres)
  const fetchGenres = async (): Promise<animeGenreResponse> => {
    const response = await backendAjax.get(`anime/genres`)

    return response.data
  }

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
        value={text || ""}
        handleTextChange={changeText}
      />
      <div className="my-2 flex gap-6 mx-auto w-fit relative">
        <motion.button
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFilterMenuOpen}
          className="text-sp-light flex gap-1"
        >
          <span>filter</span>
          <motion.div
            animate={{ rotateZ: `${isFilterMenuOpen ? "-180deg" : "0deg"}` }}
            className="h-full flex flex-col justify-center"
          >
            <Arrow
              height={18}
              width={18}
              fill={getAmountOfFilters() > 0 ? "#e91e63" : "#5c6369"}
              // className={`transition-all ease-in-out duration-200 ${
              //   isFilterMenuOpen ? "-rotate-180" : "rotate-0"
              // }`}
            />
          </motion.div>
        </motion.button>
        {getAmountOfFilters() > 0 && isFilterMenuOpen ? (
          <motion.button
            initial={{ opacity: 0, x: "-25%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-25%" }}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.05 }}
            onClick={handleClearFilters}
            className="text-sp-main hover:opacity-80 transition-all ease-in-out duration-200 absolute top-0 left-16 whitespace-nowrap"
          >
            clear filters
          </motion.button>
        ) : (
          ""
        )}
      </div>
      <div>
        {isFilterMenuOpen && !isLoading && !error ? (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <GenreList genres={genres} />
            <SearchSelectList />
          </motion.div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
export default Search
