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
        small_image_url: string
      }
    }
    name: string
  }
  language: string
}

export type CharacterDetails = {
  character: Character
  role: string
  favorites: number
  voice_actors?: VoiceActor[]
}
