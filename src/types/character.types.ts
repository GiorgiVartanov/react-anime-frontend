import { AnimeType } from "./anime.types"

type Character = {
  mal_id: number
  url: string
  images: ImageType
  name: string
}

type ImageUrls = {
  image_url: string
  small_image_url?: string
  large_image_url?: string
}

type ImageType = {
  image_url: string
  jpg?: ImageUrls
  webp?: ImageUrls
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
  manga: MangaType[]
  voices: VoiceActor[]
}
