import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import apiAjax from "../service/APIAjax"

import { FullCharacterType } from "../types/character.types"

import Page from "../components/UI/Page"
import AnimeCardList from "../components/Anime/AnimeCardList"
import Image from "../components/UI/Image"
import Loading from "../components/UI/Loading"

const Character = () => {
  const { id } = useParams()

  // function to fetch character by id
  const fetchStuff = async (): Promise<FullCharacterType> => {
    const response = await apiAjax.get(`/characters/${id}/full`)

    const data = response.data.data

    return data
  }

  // fetches character data from API
  const { isLoading, error, data } = useQuery({
    queryKey: ["stuff", id],
    queryFn: fetchStuff,
    staleTime: 1000000,
  })

  if (isLoading) return <Loading />

  if (error || !data) return <div>something went wrong</div>

  // destructures data object
  const { about, anime, images, name } = data

  const animeData = anime.map((item) => item.anime)

  return (
    <Page>
      <div className="relative shadow-sm pt-5">
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #202428c7, #202428c7), url(${
              anime?.[0].anime?.images?.jpg?.large_image_url ||
              anime?.[0].anime?.images?.jpg?.image_url
            })`,
          }}
          className="bg-top bg-no-repeat bg-cover absolute top-0 left-0 w-full h-full"
        ></div>
        <div className="absolute z-10 bg-[#e3e6eb42] top-0 dark:bg-transparent backdrop-blur-2xl w-full h-full"></div>
        <div className="mx-auto max-w-7xl w-full p-2 h-full">
          <div className="mx-auto relative z-10 flex flex-col md:flex-row max-w-7xl w-full p-2 h-full">
            <div className="mt-auto">
              {images?.jpg?.image_url ? (
                <Image
                  src={images?.jpg?.image_url}
                  alt={name}
                  loading="eager"
                  className="mx-auto shadow-md min-w-[240px] md:min-w-[280px]"
                />
              ) : (
                ""
              )}
              <p className="text-lg mt-1 md:text-left text-center"> {name}</p>
            </div>

            <div className="ml-2 mb-1 flex flex-col">
              <p className="mt-auto">{about}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl w-full p-2 h-full">
        <AnimeCardList data={[animeData]} />
      </div>
    </Page>
  )
}
export default Character
