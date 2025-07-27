import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Props {
  showButton?: boolean
  value?: string
  className?: string
  buttonClassName?: string
  inputClassName?: string
  handleTextChange: (newText: string) => void
  debounce?: boolean
}

const SearchBar = ({
  showButton = true,
  value = "",
  className,
  buttonClassName,
  inputClassName,
  handleTextChange,
  debounce = true,
}: Props) => {
  const [searchValue, setSearchValue] = useState<string>(value)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // causes search to start
  const startSearch = () => {
    handleTextChange(searchValue)
  }

  // starts search after user clocks on Enter key
  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return

    startSearch()
  }

  // starts search 1 seconds after user ends typing
  useEffect(() => {
    if (!debounce) {
      startSearch()
      return
    }

    const timer = setTimeout(() => {
      startSearch()
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchValue, debounce])

  return (
    <div className={`flex gap-2 ${className}`}>
      <motion.input
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        type="search"
        value={searchValue}
        placeholder="search"
        className={`w-full py-2 px-2 text-center drop-shadow-md dark:drop-shadow-sm focus:drop-shadow-lg outline-none text-sp-black ${inputClassName}`}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      {showButton ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ opacity: 0.8 }}
          // whileTap={{ scale: 0.95 }}
          onClick={startSearch}
          className={`text-2xl p-1.5 m-auto bg-sp-main shadow-sm ${buttonClassName}`}
        >
          🔎
        </motion.button>
      ) : (
        ""
      )}
    </div>
  )
}
export default SearchBar
