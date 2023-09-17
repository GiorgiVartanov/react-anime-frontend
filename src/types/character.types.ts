import { AnimeType, ImageType, Entry } from "./anime.types"

type Character = {
  mal_id: number
  url: string
  images: ImageType
  name: string
}

export type VoiceActor = {
  person: {
    mal_id: number
    url: string
    images: ImageType
    name: string
  }
  language: string
}

export type CharacterDetails = {
  character: Character
  role: string
  favorites?: number
  voice_actors?: VoiceActor[]
}

export type MangaType = {
  mal_id: number
  images: ImageType
  title: string
}

export type FullCharacterType = {
  mal_id: number
  url: string
  images: ImageType
  name: string
  name_kanji: string
  nicknames: string[]
  favorites: number
  about: string
  anime: {
    role: string
    anime: AnimeType
  }[]
  manga: Entry[]
  voices: VoiceActor[]
}
