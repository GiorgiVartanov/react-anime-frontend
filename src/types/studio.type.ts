import { ImageType } from "./anime.types"

type studioTitleType = {
  type: string
  title: string
}

type externalType = {
  name: string
  url: string
}

type StudioType = {
  mal_id: number
  titles: studioTitleType[]
  images: ImageType
  established: string
  about: string
  external: externalType[]
}

export type StudioResponse = {
  data: StudioType
}
