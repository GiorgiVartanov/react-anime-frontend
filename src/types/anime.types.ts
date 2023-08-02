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

export type ImageUrls = {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export type TrailerImages = {
  image_url: string
  small_image_url: string
  medium_image_url: string
  large_image_url: string
  maximum_image_url: string
}

export type Trailer = {
  youtube_id: string
  url: string
  embed_url: string
  images: TrailerImages
}

export type Title = {
  type: string
  title: string
}

export type AiredDates = {
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

export type Relation = {
  relation: string
  entry: Entry[]
}

export type Entry = {
  mal_id: number
  type: string
  name: string
  url: string
}

export type FullAnimeData = {
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
  data: FullAnimeData[]
}

export type AnimeData = {
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
}

export type AnimeResponse = {
  pagination: Pagination
  data: AnimeData[]
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
