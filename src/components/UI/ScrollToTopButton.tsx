import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Props {
  className?: string
}

// button that will scroll user to the top of a page
const ScrollToTopButton = ({ className = "" }: Props) => {
  const [isOnTop, setIsOnTop] = useState<boolean>(false)

  // function that scrolls to the top of a page if user is not on the top of a page, if user already is on the top of a page if will scroll to the bottom
  const handleGoToTop = () => {
    // works incorrectly, will fix latter
    const scrollHeight = document.documentElement.scrollHeight
    if (window.scrollY < 200) {
      window.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      })
      setIsOnTop(true)
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      setIsOnTop(false)
    }
  }

  useEffect(() => {
    // function that checks if the user is at the top of the page
    const handleScroll = () => {
      setIsOnTop(window.scrollY < 200)
    }

    // adds event listener
    window.addEventListener("scroll", handleScroll)

    // cleans from event listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <motion.button
      style={{ rotate: 90 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.75, y: 0, rotateZ: isOnTop ? "180deg" : "0deg" }}
      whileHover={{ opacity: 0.9 }}
      // whileTap={{ scale: 0.95 }}
      onClick={handleGoToTop}
      className={`fixed rounded-full right-4 bottom-10 py-3 px-5 bg-sp-main text-xl font-semibold z-30 ${className}`}
    >
      {"<"}
    </motion.button>
  )
}
export default ScrollToTopButton
