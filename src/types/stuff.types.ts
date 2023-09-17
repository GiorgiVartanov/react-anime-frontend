import { ImageType, Entry } from "./anime.types"

type MangaType = {
  position: string
  manga: ImageType
}

type AnimeType = {
  position: string
  anime: Entry
}

type CharacterType = {
  mal_id: number
  url: string
  images: ImageType
  name: string
}

export type VoiceType = {
  role: string
  anime?: ImageType
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
  anime: AnimeType[]
  manga: MangaType[]
  voices: VoiceType[]
}
