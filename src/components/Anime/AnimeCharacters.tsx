import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { CharacterDetails } from "../../types/character.types"

import CharacterCardList from "../../components/Character/CharacterCardList"

const baseURL = import.meta.env.VITE_API_URL

interface Props {
  id: string
}

// renders characters for the passed animeId
const AnimeCharacters = ({ id }: Props) => {
  const [showingMore, setShowingMore] = useState<boolean>(false)

  const fetchAnime = (): Promise<CharacterDetails[]> =>
    axios
      .get(`${baseURL}/anime/${id}/characters`)
      .then((response) => response.data.data)

  const { isLoading, error, data } = useQuery({
    queryKey: ["anime-characters", id],
    queryFn: fetchAnime,
    staleTime: 1000000,
  })

  const handleShowMore = () => {
    setShowingMore((prevState) => !prevState)
  }

  if (isLoading) return <></>

  if (error || !data) return <div>"An error has occurred"</div>

  if (data.length <= 0) return <></>

  let showingItems = 0

  if (showingMore) showingItems = 18
  else showingItems = 9

  return (
    <section>
      <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
        Characters & Voice Actors
      </h2>
      <div className="h-0.5 w-full bg-sp-main mb-1"></div>
      <CharacterCardList data={data.slice(0, showingItems)} />
      {data.length > 9 ? (
        <div className="flex">
          <button
            onClick={handleShowMore}
            className="mt-1 ml-auto opacity-50 hover:opacity-75 active:opacity-75 transition-all ease-in-out duration-100"
          >
            {showingMore ? "show less" : "show more"}
          </button>
        </div>
      ) : (
        ""
      )}
    </section>
  )
}
export default AnimeCharacters
