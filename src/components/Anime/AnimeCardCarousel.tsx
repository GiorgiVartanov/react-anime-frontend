import { useState, useEffect } from "react"

import {
  AnimeType,
  AnimeResponse,
  ShortAnimeType,
} from "../../types/anime.types"
import { Props as AnimeCardProps } from "./AnimeCard"

import AnimeCard from "./AnimeCard"
import Carousel from "../UI/Carousel"

interface Props {
  data: AnimeCardProps[] | AnimeType[] | ShortAnimeType[]
  maxAmountShown?: number
  intervalDuration?: number
}

// carousel that shows anime cards
const AnimeCardCarousel = ({ data = [], intervalDuration = 5000 }: Props) => {
  return (
    <Carousel>
      {data.map((anime) => (
        <AnimeCard
          key={anime.mal_id}
          mal_id={anime.mal_id}
          url={anime.url}
          images={anime.images}
          title={anime.title}
          className="flex-1 min-w-[200px] animate-appear"
        />
      ))}
    </Carousel>
  )
}

export default AnimeCardCarousel
