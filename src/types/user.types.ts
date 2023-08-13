import { AnimeType } from "./anime.types"

type UserType = {
  username: string
  createdAt: string
  favoriteAnimeIds: string[]
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
