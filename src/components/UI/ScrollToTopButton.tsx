import { motion } from "framer-motion"

interface Props {
  className?: string
}

const ScrollToTopButton = ({ className = "" }: Props) => {
  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <motion.button
      style={{ rotate: 90 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.9, y: 0 }}
      whileHover={{ opacity: 0.75 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleGoToTop}
      className={`fixed rounded-full right-4 bottom-10 py-3 px-5 bg-sp-main text-xl font-semibold ${className}`}
    >
      {"<"}
    </motion.button>
  )
}
export default ScrollToTopButton
