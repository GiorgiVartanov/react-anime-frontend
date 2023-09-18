import { useState } from "react"
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

// renders passed image with passed attributes
// by clicking on the image it will go fullscreen
// by clicking on it when it is in a fullscreen user will be redirected on a separate page with this image
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

  // useEffect(() => {
  //   if (isImageOpen) document.body.classList.add("no-scroll")
  //   // page won't be scrollable if image is in open state
  //   else document.body.classList.remove("no-scroll") // if user exits it page will become scrollable again
  // }, [isImageOpen])

  return (
    <>
      {isImageOpen
        ? createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              onClick={handleCloseFullscreen}
              className="fixed top-0 left-0 z-20 w-full h-full dark:bg-sp-gray bg-sp-white bg-opacity-70 dark:bg-opacity-80"
            >
              <div className="w-full h-screen relative">
                <a
                  href={src}
                  target="_blank"
                >
                  <motion.img
                    style={{
                      top: "50%",
                      left: "50%",
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    src={src}
                    alt={alt}
                    loading="eager"
                    className={`cursor-pointer shadow-xl absolute`}
                    onClick={handleOpenFullscreen}
                  />
                </a>
              </div>
            </motion.div>,
            document.body
          )
        : ""}
      <motion.img
        variants={item}
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
