import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"

const item = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
}

interface Props {
  src: string
  alt: string
  height?: string | number
  width?: string | number
  loading?: "lazy" | "eager"
  className?: string
  [x: string]: any
}

const Image = ({
  src,
  alt,
  height,
  width,
  loading = "lazy",
  className,
  ...rest
}: Props) => {
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false)

  const handleOpenFullscreen = () => {
    setIsImageOpen(true)
  }

  const handleCloseFullscreen = () => {
    setIsImageOpen(false)
  }

  useEffect(() => {
    if (isImageOpen) document.body.classList.add("no-scroll")
    // page won't be scrollable if image is in open state
    else document.body.classList.remove("no-scroll") // if user exits it page will become scrollable again
  }, [isImageOpen])

  return (
    <>
      {isImageOpen
        ? createPortal(
            <div
              onClick={handleCloseFullscreen}
              className="fixed top-0 left-0 z-20 w-full h-full dark:bg-sp-gray bg-sp-white bg-opacity-70 dark:bg-opacity-80"
            >
              <div className="w-full h-screen relative">
                <a
                  href={src}
                  target="_blank"
                >
                  <img
                    src={src}
                    alt={alt}
                    loading="eager"
                    className={`cursor-pointer shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                    onClick={handleOpenFullscreen}
                  />
                </a>
              </div>
            </div>,
            document.body
          )
        : ""}
      <motion.img
        variants={item}
        // initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        whileHover={{ opacity: 0.8 }}
        src={src}
        alt={alt}
        height={height}
        width={width}
        loading={loading}
        className={`cursor-pointer object-cover ${className}`}
        onClick={handleOpenFullscreen}
        {...rest}
      />
    </>
  )
}
export default Image
