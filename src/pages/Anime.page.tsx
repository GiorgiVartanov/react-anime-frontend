import { NavLink, Outlet, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import apiAjax from "../service/APIAjax"
import backendAjax from "../service/backendAjax"
import { motion } from "framer-motion"

import { FullAnimeType } from "../types/anime.types"

import { useDocumentTitle } from "../hooks/useDocumentTitle"

import AnimeRecommendationCardList from "../components/Anime/AnimeRecommendationCardList"
import GenreList from "../components/Search/GenreList"
import NavigationLink from "../components/Navigation/NavigationLink"
import AnimePictures from "../components/Anime/AnimePictures"
import Image from "../components/UI/Image"
import AnimeTrailer from "../components/Anime/AnimeTrailer"
import AnimeRecommendations from "../components/Anime/AnimeRecommendations"
import AnimeCharacters from "../components/Anime/AnimeCharacters"
import AnimeComments from "../components/Anime/AnimeComments"
import Button from "../components/UI/Button"
import AddToFavoritesButton from "../components/Anime/AddToFavoritesButton"
import Loading from "../components/UI/Loading"

const Anime = () => {
  const [showFullText, setShowFullText] = useState<boolean>(false)

  const [hasPictures, setHasPictures] = useState<boolean>(true) // if anime has no images
  const [hasRecommendations, setHasRecommendations] = useState<boolean>(true) // if there are no recommendations
  const [hasTrailer, setHasTrailer] = useState<boolean>(true) // if it has trailer
  const [hasCharacters, setHasCharacters] = useState<boolean>(true) // if it has characters (some very unpopular or new shows have empty fields on this value)

  const { id, slug } = useParams<{ id: string; slug: string }>()

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
  useDocumentTitle(slug || "aniPage")

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
      { title: "Japanese", value: title_japanese },
      // { title: "Title Synonyms", value: title_synonyms },
      { title: "Episodes Count", value: episodes },
      { title: "Type", value: type },
      { title: "Source", value: source },
      { title: "Aired", value: aired.string },
      { title: "Episode Duration", value: duration },
      { title: "Rating", value: rating },
      { title: "Score", value: score },
      {
        title: "Producers",
        value: (
          <div className="inline">
            {producers.map((producer) => (
              <span
                key={producer.mal_id}
                className="mr-1 bg-sp-black px-1"
              >
                {producer.name}
              </span>
            ))}
          </div>
        ),
      },
      {
        title: "Licensors",
        value: (
          <div className="inline">
            {licensors.map((licensor) => (
              <span
                key={licensor.mal_id}
                className="mr-1 bg-sp-black px-1"
              >
                {licensor.name}
              </span>
            ))}
          </div>
        ),
      },
      {
        title: "Studios",
        value: (
          <div className="inline-flex">
            {studios.map((studio) => (
              <span
                key={studio.mal_id}
                className="mr-1 bg-sp-black px-1"
              >
                {studio.name}
              </span>
            ))}
          </div>
        ),
      },
    ]

    if (Number(information[1].value) <= 1) information.splice(1, 1) // it will only show episodes amount if there are more than 1 episodes

    // information.map(({ title, value }) => console.log(value))

    return (
      <div className="backdrop-blur-2xl px-3 py-2 lg:py-12 lg:mx-0 max-w-lg mx-auto w-full lg:w-auto flex flex-col gap-1 shadow-sm bg-[#cdced1471] dark:bg-[#20242852]">
        {information.map(({ title, value }) => (
          <div
            key={title}
            className=""
          >
            <span className="font-semibold">{title}: </span>
            <span className="opacity-60 text-white">{value}</span>
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
            <AddToFavoritesButton
              animeId={id || ""}
              className="w-full mt-3"
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // transition={{ duration: 0.5 }}
    >
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
            <AnimeTrailer videoId={trailer.youtube_id} />
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
    </motion.div>
  )
}

export default Anime
