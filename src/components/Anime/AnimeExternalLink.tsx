interface Props {
  name: string
  url: string
}

const AnimeExternalLink = ({ name, url }: Props) => {
  return (
    <li className="list-none">
      <a
        href={url}
        className="mr-1 bg-sp-black px-1"
      >
        {name}
      </a>
    </li>
  )
}
export default AnimeExternalLink
