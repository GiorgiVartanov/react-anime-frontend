import { useState, useEffect } from "react"
import { BsSearch } from "react-icons/bs"

interface Props {
  value: string | null
  className?: string
  handleTextChange: (newText: string) => void
}

const SearchBar = ({ value, className, handleTextChange }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("")

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
    const timer = setTimeout(() => {
      startSearch()
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchValue])

  return (
    <div className="flex gap-2">
      <input
        type="search"
        value={searchValue}
        placeholder="search"
        className={`w-full py-2 px-2 text-center drop-shadow-md dark:drop-shadow-sm focus:drop-shadow-lg transition-all ease-in-out duration-200 outline-none text-sp-black ${className}`}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      {/* <button
        onClick={startSearch}
        className="text-2xl p-1.5 m-auto bg-red-500 shadow-sm"
      >
        🔎
      </button> */}
    </div>
  )
}
export default SearchBar
