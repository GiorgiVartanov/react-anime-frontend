export type Pagination = {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
    per_page: number
  }
}

type ImageUrls = {
  image_url: string
  small_image_url?: string
  large_image_url?: string
}

export type ImageType = {
  jpg?: ImageUrls
  webp: ImageUrls
}

type TrailerImages = {
  image_url: string
  small_image_url: string
  medium_image_url: string
  large_image_url: string
  maximum_image_url: string
}

type Trailer = {
  youtube_id: string
  url: string
  embed_url: string
  images: TrailerImages
}

type Title = {
  type: string
  title: string
}

type AiredDates = {
  from: string
  to: string
  prop: {
    from: {
      day: number
      month: number
      year: number
    }
    to: {
      day: number
      month: number
      year: number
    }
  }
  string: string
}

type Relation = {
  relation: string
  entry: Entry[]
}

type Entry = {
  mal_id: number
  type: string
  name: string
  url: string
}

export type FullAnimeType = {
  mal_id: number
  url: string
  images: {
    jpg: ImageUrls
    webp: ImageUrls
  }
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: number
  status: string
  airing: boolean
  aired: AiredDates
  duration: string
  rating: string
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis?: string
  background: string
  season: string
  year: number
  broadcast: {
    day: string
    time: string
    timezone: string
    string: string
  }
  producers: Entry[]
  licensors: Entry[]
  studios: Entry[]
  genres: Entry[]
  explicit_genres: any[]
  themes: Entry[]
  demographics: any[]
  relations: {
    relation: string
    entry: Entry[]
  }[]
  theme: {
    openings: string[]
    endings: string[]
  }
  external: {
    name: string
    url: string
  }[]
  streaming: {
    name: string
    url: string
  }[]
}

export type FullAnimeResponse = {
  pagination: Pagination
  data: FullAnimeType[]
}

export type AnimeType = {
  images: ImageType
  mal_id: number
  title: string
}

// export type AnimeType = {
//   mal_id: number
//   url: string
//   images: {
//     jpg: ImageUrls
//     webp: ImageUrls
//   }
//   trailer: Trailer
//   approved: boolean
//   titles: Title[]
//   title: string
//   title_english: string
//   title_japanese: string
//   title_synonyms: string[]
//   type: string
//   source: string
//   episodes: number
//   status: string
//   airing: boolean
//   aired: AiredDates
//   duration: string
//   rating: string
//   score: number
//   scored_by: number
//   rank: number
//   popularity: number
//   members: number
//   favorites: number
//   synopsis?: string
//   background: string
//   season: string
//   year: number
//   broadcast: {
//     day: string
//     time: string
//     timezone: string
//     string: string
//   }
//   producers: Entry[]
//   licensors: Entry[]
//   studios: Entry[]
//   genres: Entry[]
//   explicit_genres: any[]
//   themes: Entry[]
//   demographics: any[]
// }

// export type ShortAnimeType = {
//   images: ImageType
//   mal_id: number
//   title: string
// }

export type AnimeResponse = {
  pagination: Pagination
  data: AnimeType[]
}

export type InfiniteAnimeResponse = {
  pageParams: any[] // I don't know what type is should be, in the browser console its just says Array(1) 0:undefined
  pages: AnimeResponse[]
}

export type AnimeRecommendationEntry = {
  entry: {
    mal_id: number
    url: string
    images: {
      jpg: ImageUrls
      webp: ImageUrls
    }
    title: string
  }
  url: string
  votes: number
}

export type AnimeRecommendation = {
  data: AnimeRecommendationEntry[]
}

export type animeGenre = {
  mal_id: number
  name: string
  url: string
  count: number
}

export type animeGenreResponse = {
  data: animeGenre[]
}

// export type animePictureType = {
//   jpg: {
//     image_url: string
//     small_image_url: string
//     large_image_url: string
//   }
//   webp: {
//     image_url: string
//     small_image_url: string
//     large_image_url: string
//   }
// }

export type animePicturesResponseType = {
  data: ImageType[]
}
