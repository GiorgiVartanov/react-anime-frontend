interface Props {
  videoId: string
}

// renders youtube video in frame with given videoID
const AnimeTrailer = ({ videoId }: Props) => {
  if (!videoId) return <></>

  return (
    <div className="aspect-w-16 aspect-h-9 my-2 shadow-md">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="W3Schools Free Online Web Tutorials"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className=""
        frameBorder="0"
      />
    </div>
  )
}
export default AnimeTrailer
