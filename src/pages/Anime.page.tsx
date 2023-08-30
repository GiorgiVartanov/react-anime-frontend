import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import apiAjax from "../service/APIAjax"
import backendAjax from "../service/backendAjax"

import { FullAnimeType } from "../types/anime.types"
import { UserResponse } from "../types/user.types"

import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { useAuthStore } from "../store/authStore"

import Page from "../components/UI/Page"
import GenreList from "../components/Search/GenreList"
import AnimePictures from "../components/Anime/AnimePictures"
import Image from "../components/UI/Image"
import AnimeRecommendations from "../components/Anime/AnimeRecommendations"
import AnimeCharacters from "../components/Anime/AnimeCharacters"
import AnimeComments from "../components/Anime/AnimeComments"
import AnimeFavoriteButton from "../components/Anime/AnimeFavoriteButton"
import AddToFavoritesButton from "../components/Anime/AddToFavoritesButton"
import RemoveFromFavoritesButton from "../components/Anime/RemoveFromFavoritesButton"
import AnimeExternalLink from "../components/Anime/AnimeExternalLink"
import Loading from "../components/UI/Loading"

const Anime = () => {
  const [showFullText, setShowFullText] = useState<boolean>(false)

  const { id } = useParams<{ id: string }>()

  const [username, isLoggedIn, tokek] = useAuthStore((state) => [
    state.username,
    state.isLoggedIn,
    state.token,
  ])

  // function to fetch single anime
  const fetchAnime = async (): Promise<FullAnimeType> => {
    const response = await apiAjax.get(`/anime/${id}/full`)

    return response.data.data
  }

  // fetches anime form API
  const { isLoading, error, data } = useQuery({
    queryKey: ["anime-full", id],
    queryFn: fetchAnime,
    staleTime: 1000000,
  })

  // changes page's title
  const [documentTitle, setDocumentTitle] = useDocumentTitle(
    data?.title || "aniPage"
  )

  useEffect(() => {
    if (!data) return

    setDocumentTitle(data.title)
  }, [data, setDocumentTitle])

  if (isLoading) return <Loading />

  if (error || !data) return <div>An error has occurred</div>

  const {
    mal_id,
    url,
    images,
    trailer,
    approved,
    titles,
    title,
    title_english,
    title_japanese,
    title_synonyms,
    type,
    source,
    episodes,
    status,
    airing,
    aired,
    duration,
    rating,
    score,
    scored_by,
    rank,
    popularity,
    synopsis,
    background,
    season,
    year,
    broadcast,
    producers,
    licensors,
    studios,
    genres,
    explicit_genres,
    themes,
    demographics,
    relations,
    theme,
    external,
    streaming,
  } = data

  // renders description (synopsys) of a show
  const renderDescription = () => {
    // if the lengths of description exceeds 1200 characters it will only render 1200 characters and button
    // by pressing on button whole text will be rendered

    function handleShowFullText() {
      setShowFullText((prevState) => !prevState)
    }

    if (!synopsis) return

    if (synopsis.length < 600) {
      return <p>{synopsis}</p>
    }

    if (synopsis.length > 600 && showFullText) {
      return (
        <p>
          {synopsis + " "}
          <span>
            <button
              onClick={handleShowFullText}
              className="opacity-20"
            >
              show less
            </button>
          </span>
        </p>
      )
    }

    return (
      <p>
        {synopsis.slice(0, 600)}
        <span>
          <button
            onClick={handleShowFullText}
            className="opacity-20 ml-1"
          >
            ... show more
          </button>
        </span>
      </p>
    )
  }

  // renders information (episodes count, score, rating, etc.)
  const renderInformation = () => {
    const information = [
      { title: "Japanese", value: <span>{title_japanese}</span> },
      // { title: "Title Synonyms", value: title_synonyms },
      { title: "Episodes Count", value: <span>{episodes}</span> },
      { title: "Type", value: <span>{type}</span> },
      { title: "Source", value: <span>{source}</span> },
      { title: "Aired", value: <span>{aired.string}</span> },
      { title: "Episode Duration", value: <span>{duration}</span> },
      { title: "Rating", value: <span>{rating}</span> },
      { title: "Score", value: <span>{score}</span> },
      {
        title: "Producers",
        value: producers.map((producer) => (
          <AnimeExternalLink
            key={producer.mal_id}
            url={`../studio/${producer.mal_id}`}
            name={producer.name}
            className="opacity-60"
          />
        )),
      },
      {
        title: "Licensors",
        value: licensors.map((licensor) => (
          <AnimeExternalLink
            key={licensor.mal_id}
            url={`../studio/${licensor.mal_id}`}
            name={licensor.name}
            className="opacity-60"
          />
        )),
      },
      {
        title: "Studios",
        value: studios.map((studio) => (
          <AnimeExternalLink
            key={studio.mal_id}
            url={`../studio/${studio.mal_id}`}
            name={studio.name}
            className="opacity-60"
          />
        )),
      },
      {
        title: "External Links",
        value: external.map((link) => (
          <AnimeExternalLink
            key={link.url}
            url={link.url}
            name={link.name}
            className="opacity-60"
          />
        )),
      },
    ]

    if (Number(information[1].value) <= 1) information.splice(1, 1) // it will only show episodes amount if there are more than 1 episodes

    return (
      <div className="backdrop-blur-2xl px-3 py-2 lg:py-12 lg:mx-0 max-w-lg mx-auto w-full lg:w-auto flex flex-col gap-1 shadow-sm bg-[#cdced1471] dark:bg-[#20242852]">
        {information.map(({ title, value }) => (
          <div
            key={title}
            className="flex flex-wrap gap-1 tracking-wide [&>*:not(:first-child)]:opacity-60"
          >
            <span className="font-semibold inline">{title}: </span>
            {value}
          </div>
        ))}
        <GenreList
          genres={genres}
          className="inline mt-3"
        />
      </div>
    )
  }

  const renderImage = () => {
    return (
      <Image
        src={images.jpg.large_image_url || images.jpg.image_url}
        alt={title}
        loading="eager"
        // height="300"
        // width="200"
        className="shadow-md mx-auto md:mx-0 md:w-[200px] md:h-[300px] md:min-w-[200px]"
      />
    )
  }

  // renders image, title, description and information
  const renderAnimeDetails = () => {
    return (
      <div className="flex lg:flex-row flex-col gap-4 justify-between text-sm">
        <div className="flex md:flex-row mx-auto lg:mx-0 flex-col relative z-20 gap-4 justify-between py-12">
          <div className="md:w-[200px] mx-auto md:min-w-[200px] md:mx-0">
            {renderImage()}
            <AnimeFavoriteButton
              mal_id={mal_id}
              images={images}
              title={title}
            />
          </div>
          <div className="max-w-md">
            <h2 className="font-bold text-sp-main text-lg mb-2">
              {title} <span className="ml-2 opacity-20">{title_japanese}</span>
            </h2>
            {renderDescription()}
          </div>
        </div>
        {renderInformation()}
      </div>
    )
  }

  return (
    <Page>
      <div className="relative shadow-sm">
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #202428c7, #202428c7), url(${images.jpg.large_image_url})`,
          }}
          className="bg-top bg-no-repeat bg-cover absolute top-0 left-0 w-full h-full"
        ></div>
        <div className="relative z-20 backdrop-blur-2xl mb-8 bg-[#e3e6eb42] dark:bg-transparent">
          <div className="mx-auto max-w-7xl w-full px-2 h-full">
            {renderAnimeDetails()}
          </div>
        </div>
      </div>
      {id ? (
        <div>
          <div className="mx-auto max-w-7xl w-full p-2 h-full flex flex-col gap-8">
            <AnimePictures animeId={id} />
            <AnimeRecommendations id={id} />
            {/* <AnimeTrailer videoId={trailer.youtube_id} /> */}
            <AnimeCharacters id={id} />
          </div>
          <div className="bg-sp-white dark:bg-sp-gray">
            <div className="mx-auto max-w-7xl w-full p-2 h-full mt-8 pt-8 ">
              <AnimeComments id={id} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Page>
  )
}

export default Anime
