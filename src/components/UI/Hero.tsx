import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import backendAjax from "../../service/backendAjax"
import { motion } from "framer-motion"

import Loading from "./Loading"

const Hero = () => {
  const fetchQuote = async () => {
    const response = await backendAjax.get("quote")

    return response.data.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchQuote,
    queryKey: ["anime-quote"],
    staleTime: 100000,
  })

  const renderHeroImage = ({
    text,
    author,
    title,
    imageUrl,
    mal_id,
  }: {
    text: string
    author: string
    title?: string
    imageUrl: string
    mal_id?: number
  }) => {
    return (
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "360px" }}
        style={{ backgroundImage: `url(${imageUrl})` }}
        transition={{ duration: 0.25 }}
        className="h-[360px] grid place-content-center bg-no-repeat bg-cover bg-top"
      >
        <div className="p-2">
          <q className="text-sp-main leading-9 bg-sp-black font-semibold -ml-2 bg-opacity-50 p-0.5 text-xl">
            {text}
          </q>
          <Link to={`/anime/${mal_id}`}>
            <motion.p
              initial={{ opacity: 0.7, scale: 1 }}
              whileHover={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              className="text-right -mr-2"
            >
              - {author}{" "}
              <span className="opacity-75 font-semibold">({title})</span>
            </motion.p>
          </Link>
        </div>
      </motion.div>
    )
  }

  if (isLoading) return <Loading />
  if (error || !data) {
    console.log(error || "")

    return renderHeroImage({
      text: "something went wrong, check browser console for detailed information",
      author: "Developer",
      imageUrl: "/rain.jpg",
    })
  }

  const { text, author, title, mal_id, images } = data

  return renderHeroImage({
    text,
    author,
    title,
    imageUrl: images.jpg.large_image_url,
    mal_id: mal_id,
  })
}
export default Hero
