import {
  SortType,
  ShowTypeType,
  OrderType,
  RatingType,
  StatusType,
} from "../../types/search.types"

interface Props {
  selected: string | null
  options: (string | null)[]
  // select: (newValue: SortType | ShowTypeType | OrderType) => void
  // select: (newValue: SortType) => void | (newValue: ShowTypeType) => void | (newValue: OrderType) => void
  select: (newValue: any) => void // change latter
  className?: string
}

const Select = ({ selected, options, select, className }: Props) => {
  const handleSelectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    select(
      e.target.value as
        | SortType
        | ShowTypeType
        | OrderType
        | RatingType
        | StatusType
    )
  }

  return (
    <select
      defaultValue={selected || "All"}
      onChange={handleSelectSelect}
      className={`flex-1 text-sp-black dark:text-sp-white bg-sp-white hover:opacity-80 dark:bg-sp-gray transition-all ease-in-out duration-200 p-2 ${className}`}
    >
      {options.map((option) => (
        <option
          key={option}
          value={option || "All"}
          className="px-1"
        >
          {option || "All"}
        </option>
      ))}
    </select>
  )
}
export default Select
