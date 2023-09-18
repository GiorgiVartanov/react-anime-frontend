import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import apiAjax from "../service/APIAjax"

import { StudioResponse } from "../types/studio.type"

import Page from "../components/UI/Page"
import Loading from "../components/UI/Loading"
import Image from "../components/UI/Image"
import AnimeList from "../components/Anime/AnimeList"
import AnimeExternalLink from "../components/Anime/AnimeExternalLink"

// page that shows information about studio/licensors/producers
const Studio = () => {
  const { id } = useParams() // ../studio/:id

  const getGenres = async (): Promise<StudioResponse> => {
    const result = await apiAjax.get(`producers/${id}/full`)

    return result.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: getGenres,
    queryKey: ["studio", id],
    staleTime: 100000,
  })

  if (isLoading) return <Loading />

  if (error || !data?.data) return <div>Something wen't wrong</div>

  const { images, titles, established, about, external } = data.data

  const date = new Date(established).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Page>
      <div className="dark:bg-sp-gray bg-sp-white">
        <div className="mx-auto flex md:flex-row flex-col gap-3  w-full h-full max-w-7xl p-2">
          {images?.jpg?.image_url ? (
            <Image
              src={images?.jpg?.image_url}
              alt={titles[0].title}
              loading="eager"
              className="shadow-md min-w-[240px] md:min-w-[280px] sm:max-h-[320px]"
            />
          ) : (
            ""
          )}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">{titles[0].title}</h2>
            <p>{about}</p>
            <div className="flex flex-wrap gap-1 opacity-90">
              <span>External Links:</span>
              {external.map((link) => (
                <AnimeExternalLink
                  key={link.url}
                  url={link.url}
                  name={link.name}
                />
              ))}
            </div>
            <p className="opacity-90 mt-2">
              Established: <span className="opacity-60">{date}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-2 h-full gap-6 flex flex-col max-w-7xl mx-auto">
        <AnimeList
          query={`/anime?producers=${id}&sfw`}
          queryKey={["anime-studio", id]}
        />
      </div>
    </Page>
  )
}
export default Studio
