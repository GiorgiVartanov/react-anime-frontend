import { SortType, ShowTypeType, OrderType } from "../../types/search.types"

interface Props {
  selected: string
  options: string[]
  // select: (newValue: SortType | ShowTypeType | OrderType) => void
  // select: (newValue: SortType) => void | (newValue: ShowTypeType) => void | (newValue: OrderType) => void
  select: (newValue: any) => void // change latter
  className?: string
}

const Select = ({ selected, options, select, className }: Props) => {
  const handleSelectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    select(e.target.value as SortType | ShowTypeType | OrderType)
  }

  return (
    <select
      defaultValue={selected}
      onChange={handleSelectSelect}
      className={`text-sp-black ${className}`}
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  )
}
export default Select
