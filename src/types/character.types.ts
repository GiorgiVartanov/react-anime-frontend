import { ShortAnimeType } from "./anime.types"

type Character = {
  mal_id: number
  url: string
  images: {
    jpg?: {
      image_url: string
    }
    webp?: {
      image_url: string
      small_image_url: string
    }
  }
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
    images: {
      jpg?: {
        image_url: string
      }
      webp?: {
        image_url: string
        small_image_url?: string
      }
    }
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

export type AnimeType = {
  mal_id: number
  url: string
  images: ImageType
  title: string
}

export type MangaType = {
  mal_id: number
  url: string
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
    anime: ShortAnimeType
  }[]
  manga: MangaType[]
  voices: VoiceActor[]
}
