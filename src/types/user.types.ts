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

export type profilePictureType = {
  data: "string"
}

export type FriendsResponseType = {
  data: string[]
}
