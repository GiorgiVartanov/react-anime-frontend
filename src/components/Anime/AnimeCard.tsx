import { Link } from "react-router-dom"

import { ImageUrls } from "../../types/anime.types"

export interface Props {
  mal_id: number
  url: string
  images: {
    jpg: ImageUrls
    webp: ImageUrls
  }
  title: string
}

const AnimeCard = ({ mal_id, url, images, title }: Props) => {
  return (
    <Link
      to={`../../anime/${mal_id}/`}
      className="block group"
    >
      <div className="aspect-w-2 aspect-h-3 overflow-hidden">
        <img
          src={images.webp.image_url}
          alt={title}
          loading="lazy"
          className="w-full h-full shadow-md hover:scale-105 transition-all ease-in-out duration-300"
        />
      </div>
      <p className="text-sm whitespace-nowrap overflow-hidden transition-all ease-in-out duration-200">
        {title}
      </p>
    </Link>
  )
}
export default AnimeCard
