import { Link } from "react-router-dom"

interface Props {
  name: string
  url: string
  className?: string
}

const AnimeExternalLink = ({ name, url, className = "" }: Props) => {
  return (
    <Link
      to={url}
      className={`mr-1 bg-sp-black text-sp-white px-1 ${className}`}
    >
      {name}
    </Link>
  )
}
export default AnimeExternalLink
