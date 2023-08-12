import axios from "axios"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

interface Props {
  videoId: string
}

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

// renders youtube video in frame with given videoID
const AnimeTrailer = ({ videoId }: Props) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(true)

  const checkVideoAvailability = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${YOUTUBE_API_KEY}`
    )

    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: checkVideoAvailability,
    queryKey: ["youtube video", videoId],
  })

  useEffect(() => {
    if (
      !videoId ||
      isLoading ||
      error ||
      !data?.items?.[0].contentDetails?.regionRestriction?.allowed
    )
      return

    if (data.items && data.items.length > 0) {
      const restrictedRegions =
        data.items[0].contentDetails.regionRestriction.allowed

      // checking user's region, so if this video is blocked in their country it won't show it
      // its not correct, because it just checks browser language, there is a way to check region by using  API (http://ip-api.com/json) and send user's IP to it to get their region, but I think its not that big of a deal
      const userLocale = navigator.language || navigator.language
      const userRegion = new Intl.Locale(userLocale).region

      setIsAvailable(!restrictedRegions.includes(userRegion))
    }
  }, [videoId, isLoading, error, data])

  if (!videoId) return <></>

  if (isLoading) return <>Loading...</>

  if (error || !data) return <>something wen't wrong</>

  if (!isAvailable) return <></>

  return (
    <div>
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
    </div>
  )
}
export default AnimeTrailer
