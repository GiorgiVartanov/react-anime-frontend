import { useParams } from "react-router-dom"
import apiAjax from "../service/APIAjax"
import { useQuery } from "@tanstack/react-query"

import { StuffType, VoiceType } from "../types/stuff.types"
import { CharacterDetails } from "../types/character.types"

import AnimeCardList from "../components/Anime/AnimeCardList"
import CharacterCardList from "../components/Character/CharacterCardList"

const Stuff = () => {
  const { id } = useParams()

  const fetchStuff = async (): Promise<StuffType> => {
    const response = await apiAjax.get(`/people/${id}/full`)

    const data = response.data.data

    return data
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["stuff", id],
    queryFn: fetchStuff,
    staleTime: 1000000,
  })

  if (isLoading) return <div>loading...</div>

  if (error || !data) return <div>something went wrong</div>

  const {
    alternate_names,
    anime,
    birthday,
    family_name,
    given_name,
    images,
    manga,
    name,
    voices,
    about,
  } = data

  const animeData = anime.map((item) => item.anime)
  const characterData = voices.map((item) => ({
    role: item.role,
    character: item.character,
  }))

  const removeDuplicateMalIds = (arr: VoiceType[]) => {
    const uniqueMalIds: { [key: number]: boolean } = {}
    return arr.filter((item) => {
      if (!uniqueMalIds[item.character.mal_id]) {
        uniqueMalIds[item.character.mal_id] = true
        return true
      }
      return false
    })
  }

  const characterDataWithoutDuplicates = removeDuplicateMalIds(
    characterData as VoiceType[]
  )

  return (
    <div className="mx-auto max-w-7xl w-full p-2 h-full">
      <div className="mx-auto mt-5">
        {images?.jpg?.image_url ? (
          <img
            src={images?.jpg?.image_url}
            alt=""
            loading="lazy"
            className="mx-auto"
          />
        ) : (
          ""
        )}
        <p className="text-center text-lg my-2"> {name}</p>
      </div>
      <div className="my-2">
        <p>{about}</p>
      </div>
      <AnimeCardList data={animeData} />
      <CharacterCardList
        data={characterDataWithoutDuplicates as unknown as CharacterDetails[]} // I will fix it latter
        showSelect={false}
      />
    </div>
  )
}
export default Stuff
