import { AnimeType } from "./anime.types"

export type UserResponse = {
  data: {
    username: string
    createdAt: string
    favoriteAnimeIds: string[]
  }
}
