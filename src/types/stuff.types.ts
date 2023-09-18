import { ImageType, AnimeType } from "./anime.types"

type MangaType = {
  position: string
  manga: ImageType
}

type VoiceActorAnimeType = AnimeType & {
  position: string
}

type CharacterType = {
  mal_id: number
  url: string
  images: ImageType
  name: string
}

export type VoiceType = {
  role: string
  anime?: AnimeType
  character: CharacterType
}

export type StuffType = {
  mal_id: number
  url: string
  website_url: string
  images: ImageType
  name: string
  given_name: string
  family_name: string
  alternate_names: string[]
  birthday: string
  favorites: number
  about: string
  anime: VoiceActorAnimeType[]
  manga: MangaType[]
  voices: VoiceType[]
}
