import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

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
                    className={`cursor-pointer shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] max-h-[600px] p-2`}
                    onClick={handleOpenFullscreen}
                  />
                </a>
              </div>
            </div>,
            document.body
          )
        : ""}
      <img
        src={src}
        alt={alt}
        height={height}
        width={width}
        loading={loading}
        className={`cursor-pointer transition-all ease-in-out duration-200 hover:opacity-80 ${className}`}
        onClick={handleOpenFullscreen}
        {...rest}
      />
    </>
  )
}
export default Image
