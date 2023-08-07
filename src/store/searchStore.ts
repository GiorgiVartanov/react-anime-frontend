import { create } from "zustand"

import { animeGenreResponse, animeGenre } from "../types/anime.types"
import {
  SortType,
  ShowTypeType,
  OrderType,
  StatusType,
  RatingType,
} from "../types/search.types"

interface searchState {
  limit: number
  page: number
  categories: string[]
  genres: { mal_id: number; name: string }[]
  selectedGenres: number[]
  season: string | null
  seasonYear: number | null
  sort: SortType
  sortOptions: string[]
  types: ShowTypeType
  typesOptions: string[]
  orderBy: OrderType
  orderByOptions: string[]
  minScore: number
  maxScore: number
  status: StatusType
  statusOptions: (string | null)[]
  rating: RatingType
  ratingOptions: (string | null)[]
  text: string | null
}

interface searchActions {
  // setAnimeGenres: (genres: animeGenreResponse) => void
  setAnimeGenres: (genresData: animeGenreResponse) => void
  selectGenre: (newGenre: number) => void
  unSelectGenre: (genreIdToRemove: number) => void
  changeText: (newText: string) => void
  changeSorting: (newSorting: SortType) => void
  changeOrdering: (newOrder: OrderType) => void
  changeStatus: (newStatus: StatusType) => void
  changeRating: (newRating: RatingType) => void
  goToNextPage: () => void
  clearFilters: () => void
}

export const useSearchStore = create<searchState & searchActions>(
  (set, get) => ({
    limit: 20,
    page: 1,
    categories: [],
    genres: [],
    selectedGenres: [],
    season: null,
    seasonYear: null,
    sort: "desc",
    sortOptions: ["desc", "asc"],
    types: null,
    typesOptions: ["all", "tv", "movie", "ova", "special", "ona", "music"],
    orderBy: "score",
    orderByOptions: [
      "mal_id",
      "title",
      "start_date",
      "end_date",
      "episodes",
      "score",
      "scored_by",
      "rank",
      "popularity",
      "members",
      "favorites",
    ],
    status: null,
    statusOptions: [null, "airing", "complete", "upcoming"],
    minScore: 0,
    maxScore: 10,
    rating: null,
    ratingOptions: [null, "g", "pg", "pg13", "r17"],
    text: "",
    setAnimeGenres: (genresData: animeGenreResponse) => {
      const genres = genresData.data.map((genre) => ({
        mal_id: genre.mal_id,
        name: genre.name,
      }))

      return set(() => ({ genres: genres }))
    },
    selectGenre: (newGenre: number) =>
      set((state) => ({ selectedGenres: [...state.selectedGenres, newGenre] })),
    unSelectGenre: (genreIdToRemove: number) =>
      set((state) => ({
        selectedGenres: state.selectedGenres.filter(
          (genreId) => genreId !== genreIdToRemove
        ),
      })),
    changeText: (newText: string) => set(() => ({ text: newText })),
    changeOrdering: (
      newOrder:
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
    ) => set(() => ({ orderBy: newOrder })),
    changeSorting: (newSorting: SortType) => set(() => ({ sort: newSorting })),
    changeStatus: (newStatus: StatusType) => set(() => ({ status: newStatus })),
    changeRating: (newRating: RatingType) => set(() => ({ rating: newRating })),
    goToNextPage: () => set(() => ({ page: get().page + 1 })),
    clearFilters: () =>
      set(() => ({
        selectedGenres: [],
        status: null,
        rating: null,
        sort: "desc",
        orderBy: "score",
      })),
  })
)
