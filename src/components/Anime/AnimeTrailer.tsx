interface Props {
  videoId: string
}

// renders youtube video with given videoID in frame
const AnimeTrailer = ({ videoId }: Props) => {
  return (
    <section>
      <h2 className="text-sp-black dark:text-white mx-auto max-w-7xl mb-1 text-xl">
        Trailer
      </h2>
      <div className="h-0.5 w-full bg-sp-main mb-1"></div>
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
    </section>
  )
}
export default AnimeTrailer
