import { useParams } from "react-router-dom"
import apiAjax from "../service/APIAjax"
import { useQuery } from "@tanstack/react-query"

import { StuffType, VoiceType } from "../types/stuff.types"
import { CharacterDetails } from "../types/character.types"

import Page from "../components/UI/Page"
import CharacterCardList from "../components/Character/CharacterCardList"
import Image from "../components/UI/Image"
import Loading from "../components/UI/Loading"

// page that shows information about voice actors
const Stuff = () => {
  const { id } = useParams() // ../stuff/:id

  // function to fetch voice actor by id
  const fetchStuff = async (): Promise<StuffType> => {
    const response = await apiAjax.get(`/people/${id}/full`)

    const data = response.data.data

    return data
  }

  // fetches voice actor by id
  const { isLoading, error, data } = useQuery({
    queryKey: ["stuff", id],
    queryFn: fetchStuff,
    staleTime: 1000000,
  })

  if (isLoading) return <Loading />

  if (error || !data) return <div>something went wrong</div>

  const { images, name, voices, about } = data

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

  const characterDataWithoutDuplicates = removeDuplicateMalIds(characterData as VoiceType[])

  return (
    <Page>
      <div className="relative shadow-sm pt-5">
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #202428c7, #202428c7), url(${
              voices[0]?.anime?.images?.jpg?.large_image_url ||
              voices[0]?.anime?.images?.jpg?.image_url
            })`,
          }}
          className="bg-top bg-no-repeat bg-cover absolute top-0 left-0 w-full h-full"
        ></div>
        <div className="absolute z-10 bg-[#e3e6eb42] top-0 dark:bg-transparent backdrop-blur-2xl w-full h-full"></div>
        <div className="mx-auto relative z-10 flex flex-col md:flex-row max-w-7xl w-full p-2 h-full">
          <div className="">
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

          <div className="ml-3 mb-2 mt-auto">
            <p>{about}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl w-full p-2 h-full">
        <CharacterCardList
          data={characterDataWithoutDuplicates as unknown as CharacterDetails[]} // I will fix it latter
          showSelect={false}
        />
      </div>
    </Page>
  )
}
export default Stuff
