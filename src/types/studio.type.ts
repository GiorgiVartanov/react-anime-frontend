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
  images: {
    jpg: {
      image_url: string
    }
  }
  established: string
  about: string
  external: externalType[]
}

export type StudioResponse = {
  data: StudioType
}
