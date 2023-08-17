import { AnimeType } from "./anime.types"
import { ImageType } from "./anime.types"

export type FavoriteAnime = {
  mal_id: string
  title: string
  images: ImageType
}

type UserType = {
  username: string
  createdAt: string
  favoriteAnime: FavoriteAnime[]
  friends: string[]
}

export type UserResponse = {
  data: UserType
}

// type FriendsType = {
//   _id: string
//   user1: string
//   user2: string
// }

export type FriendsResponseType = {
  data: string[]
}
