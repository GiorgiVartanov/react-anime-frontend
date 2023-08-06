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

type MangaType = {
  position: string
  manga: {
    mal_id: number
    url: string
    images: ImageType
    title: string
  }
}

type AnimeType = {
  position: string
  anime: {
    mal_id: number
    url: string
    images: ImageType
    title: string
  }
}

type CharacterType = {
  mal_id: number
  url: string
  images: {
    jpg: ImageType
    webp: ImageType
  }
  name: string
}

export type VoiceType = {
  role: string
  anime?: {
    mal_id: number
    url: string
    images: ImageType
    title: string
  }
  character: CharacterType
}

export type StuffType = {
  mal_id: number
  url: string
  website_url: string
  images: {
    jpg: ImageType
  }
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
