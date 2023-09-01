import { AnimeType } from "./anime.types"

type UserType = {
  username: string
  createdAt: string
  favoriteAnime: AnimeType[]
  friends: string[]
}

export type UserResponse = {
  data: UserType
}

export type FullUserType = {
  _id: string
  username: string
  email: string
  accountType: string
}

export type FullUserResponse = {
  data: FullUserType[]
}

export type FavoriteAnimeResponse = {
  data: AnimeType[]
}

// type FriendsType = {
//   _id: string
//   user1: string
//   user2: string
// }

export type FriendsResponseType = {
  data: string[]
}
