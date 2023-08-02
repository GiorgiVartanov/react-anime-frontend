import { toast } from "react-toastify"

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
    <button
      onClick={handleGenreSelect}
      className={`inline-block bg-sp-gray px-2 py-1 shadow-sm m-0.5 ease-in-out duration-200 translate-z-[0] backface-visible transition-all hover:opacity-80 ${
        className || ""
      } ${
        isSelected
          ? `text-sp-main ${selectedClassName}`
          : `${unselectedClassName}`
      } `}
    >
      <p>{genre}</p>
    </button>
  )
}
export default Genre