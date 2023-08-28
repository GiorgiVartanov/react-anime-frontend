import { useQuery } from "@tanstack/react-query"
import apiAjax from "../../service/APIAjax"

import AnimeCardCarousel from "./AnimeCardCarousel"
import SkeletonCarousel from "../UI/Skeleton/SkeletonCarousel"

interface Props {
  title: string
  buttonText: string
  fetch: string
  queryKey: string
  onClick: () => void
}

const AnimeSection = ({
  title,
  buttonText,
  fetch,
  queryKey,
  onClick,
}: Props) => {
  const fetchData = async () => {
    const result = await apiAjax.get(
      `${fetch}&limit=20&genres_exclude=28,26,47,9,49,12,50,51,52,53,81,55,57,58,35,60,61,63,64,65,69,70,73,74,75,15`
    )

    return result.data
  }

  const { isLoading, error, data } = useQuery({
    queryFn: fetchData,
    queryKey: [queryKey],
    staleTime: 1000000,
  })

  const renderAnimeData = () => {
    // is the data is still pending it will render skeleton component
    if (isLoading) return <SkeletonCarousel height={320} />

    // it will show error message if there is an error
    if (error || !data) {
      console.log(error)
      return <div>something went wrong</div>
    }

    return <AnimeCardCarousel data={data.data} />
  }

  return (
    <section>
      <div className="flex justify-start gap-3">
        <h2 className="text-sp-black dark:text-white text-xl">{title}</h2>
        <button
          onClick={onClick}
          className="text-sm opacity-50 transition-all ease-in-out duration-200 hover:opacity-75 font-light"
        >
          {buttonText}
        </button>
      </div>

      <div className="h-0.5 w-full bg-sp-main mb-1"></div>
      {renderAnimeData()}
    </section>
  )
}
export default AnimeSection
