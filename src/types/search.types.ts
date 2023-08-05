export type OrderType =
  | "mal_id"
  | "title"
  | "start_date"
  | "end_date"
  | "episodes"
  | "score"
  | "scored_by"
  | "rank"
  | "popularity"
  | "members"
  | "favorites"

export type ShowTypeType =
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "music"
  | null

export type StatusType = "airing" | "complete" | "upcoming" | null

export type RatingType = "g" | "pg" | "pg13" | "r17" | null

export type SortType = "desc" | "asc"
