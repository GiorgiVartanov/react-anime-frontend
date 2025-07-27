import { motion } from "framer-motion"

interface Props {
  genre: string
  onGenreSelect: () => void
  onGenreUnSelect: () => void
  isSelected?: boolean
  className?: string
  selectedClassName?: string
  unselectedClassName?: string
}

// renders single genre select button
const Genre = ({
  genre,
  onGenreSelect,
  onGenreUnSelect,
  isSelected = false,
  className,
  selectedClassName,
  unselectedClassName,
}: Props) => {
  const handleGenreSelect = () => {
    if (isSelected) {
      // toast(`successfully removed ${genre} to search`)
      onGenreUnSelect()
    } else {
      // toast(`successfully added ${genre} to search`)
      onGenreSelect()
    }
  }

  return (
    <motion.button
      initial={{ opacity: 1 }}
      // whileTap={{ scale: 0.95 }}
      whileHover={{ opacity: 0.8 }}
      onClick={handleGenreSelect}
      className={`flex-1 inline-block px-2 py-1 shadow-sm m-0.5 translate-z-[0] backface-visible bg-sp-white dark:bg-sp-gray whitespace-nowrap ${
        className || ""
      } ${isSelected ? `text-sp-main ${selectedClassName}` : `${unselectedClassName}`} `}
    >
      <p>{genre}</p>
    </motion.button>
  )
}
export default Genre
