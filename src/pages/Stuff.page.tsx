import { useParams } from "react-router-dom"
import apiAjax from "../service/APIAjax"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"

import { StuffType, VoiceType } from "../types/stuff.types"
import { CharacterDetails } from "../types/character.types"
import { AnimeType } from "../types/anime.types"

import AnimeCardList from "../components/Anime/AnimeCardList"
import CharacterCardList from "../components/Character/CharacterCardList"
import Image from "../components/UI/Image"

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

  // console.log(voices[0]?.anime?.images.jpg)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative shadow-sm pt-5">
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #202428c7, #202428c7), url(${
              voices[0]?.anime?.images.jpg?.large_image_url ||
              voices[0]?.anime?.images.jpg?.image_url
            })`,
          }}
          className="bg-top bg-no-repeat bg-cover absolute top-0 left-0 w-full h-full"
        ></div>
        <div className="absolute z-10 bg-[#e3e6eb42] top-0 dark:bg-transparent backdrop-blur-2xl w-full h-full"></div>
        <div className="mx-auto relative z-10 flex flex-col md:flex-row max-w-7xl w-full p-2 h-full">
          <div>
            {images?.jpg?.image_url ? (
              <Image
                src={images?.jpg?.image_url}
                alt={name}
                loading="eager"
                className="mx-auto shadow-md"
              />
            ) : (
              ""
            )}
            <p className="text-lg my-1 md:text-left text-center"> {name}</p>
          </div>

          <div className="my-2 p-2 md:w-1/2">
            <p>{about}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl w-full p-2 h-full">
        {/* <AnimeCardList data={animeData} /> */}
        <CharacterCardList
          data={characterDataWithoutDuplicates as unknown as CharacterDetails[]} // I will fix it latter
          showSelect={false}
        />
      </div>
    </motion.div>
  )
}
export default Stuff
